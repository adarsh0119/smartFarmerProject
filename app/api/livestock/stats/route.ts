import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { verifyAuth } from '@/lib/middleware/auth';
import { successResponse, errorResponse } from '@/lib/utils/response';

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    await connectDB();

    const livestock = await Livestock.find({
      userId: authResult.userId,
      status: 'active'
    });

    // Calculate statistics
    const stats = {
      totalAnimals: livestock.length,
      byType: {} as Record<string, number>,
      totalValue: 0,
      milkProduction: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        average: 0
      },
      healthStatus: {
        healthy: 0,
        sick: 0,
        underTreatment: 0,
        pregnant: 0
      },
      upcomingVaccinations: [] as any[]
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    livestock.forEach(animal => {
      // Count by type
      stats.byType[animal.animalType] = (stats.byType[animal.animalType] || 0) + 1;

      // Total value
      stats.totalValue += animal.currentValue || animal.purchasePrice || 0;

      // Health status
      const status = animal.health?.status || 'healthy';
      if (status === 'healthy') stats.healthStatus.healthy++;
      else if (status === 'sick') stats.healthStatus.sick++;
      else if (status === 'under_treatment') stats.healthStatus.underTreatment++;
      else if (status === 'pregnant') stats.healthStatus.pregnant++;

      // Milk production
      const records = animal.milkProduction?.records || [];
      records.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate >= today) {
          stats.milkProduction.today += record.total;
        }
        if (recordDate >= weekAgo) {
          stats.milkProduction.thisWeek += record.total;
        }
        if (recordDate >= monthAgo) {
          stats.milkProduction.thisMonth += record.total;
        }
      });

      // Upcoming vaccinations
      const vaccinations = animal.health?.vaccinations || [];
      vaccinations.forEach(vac => {
        if (vac.nextDue) {
          const dueDate = new Date(vac.nextDue);
          const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          if (daysUntilDue >= 0 && daysUntilDue <= 30) {
            stats.upcomingVaccinations.push({
              animalId: animal._id,
              tagNumber: animal.tagNumber,
              animalName: animal.name || animal.tagNumber,
              vaccineName: vac.name,
              dueDate: vac.nextDue,
              daysUntilDue
            });
          }
        }
      });
    });

    // Calculate average milk production
    if (stats.milkProduction.thisWeek > 0) {
      stats.milkProduction.average = stats.milkProduction.thisWeek / 7;
    }

    // Sort upcoming vaccinations by due date
    stats.upcomingVaccinations.sort((a, b) => a.daysUntilDue - b.daysUntilDue);

    return NextResponse.json(
      successResponse('Statistics fetched successfully', stats)
    );
  } catch (error: any) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      errorResponse(error.message || 'Failed to fetch statistics'),
      { status: 500 }
    );
  }
}
