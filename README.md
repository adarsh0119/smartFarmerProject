# Smart Farmer Assistant - Next.js Edition

A modern, scalable Next.js application for the Smart Farmer Assistant platform, providing farmers with weather, crop recommendations, disease detection, and market prices.

## Features

### Core Features
- **Weather Forecasting**: Real-time weather data with farming-specific advice
- **Crop Recommendations**: AI-powered crop suggestions based on soil, season, and location
- **Disease Detection**: Image-based crop disease identification
- **Market Prices**: Real-time mandi prices and market trends
- **Expense Tracking**: Farm expense and income tracking
- **Government Schemes**: Information on agricultural schemes and subsidies
- **Marketplace**: Buy/sell agricultural products

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Styling**: Tailwind CSS
- **Icons**: Lucide React Icons
- **State Management**: React Hooks
- **Validation**: Custom validators with Zod

## Project Structure

```
smart-farmer-next/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── common/            # Shared components
│   ├── dashboard/         # Dashboard components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── db/               # Database models and connection
│   ├── api/               # API utilities
│   ├── middleware/         # Auth middleware
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript types
├── public/                # Static assets
└── styles/                # Global styles
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB (local or Atlas)
- Weather API key (OpenWeatherMap)
- Twilio account for SMS (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-farmer-next
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up MongoDB:
   - Local: Install MongoDB locally or use MongoDB Atlas
   - Update `.env.local` with your MongoDB URI

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_openweathermap_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to mobile
- `POST /api/auth/verify-otp` - Verify OTP and get token
- `POST /api/auth/register` - Complete registration
- `GET /api/auth/profile` - Get user profile

### Weather
- `GET /api/weather/current` - Current weather
- `GET /api/weather/forecast` - Weather forecast
- `GET /api/weather/alerts` - Weather alerts

### Crops
- `GET /api/crops` - List crops with filters
- `GET /api/crops/:id` - Get crop details
- `POST /api/crops` - Add new crop (admin)
- `GET /api/crops/recommendations` - Get crop recommendations

### Diseases
- `POST /api/diseases/detect` - Upload image for disease detection
- `GET /api/diseases` - List common diseases
- `GET /api/diseases/:id` - Disease details and treatment

### Market Prices
- `GET /api/prices` - Get current market prices
- `GET /api/prices/trends` - Price trends
- `GET /api/prices/alerts` - Price alerts

### Expenses
- `GET /api/expenses` - List expenses
- `POST /api/expenses` - Add expense
- `GET /api/expenses/summary` - Expense summary

## Development

### Running in Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Running Tests
```bash
npm test
```

## Features in Detail

### 1. Weather Dashboard
- Real-time weather data
- 7-day forecast
- Farming-specific weather advice
- Weather alerts and warnings

### 2. Crop Recommendations
- Personalized crop suggestions
- Soil and season-based recommendations
- Profitability analysis
- Risk assessment

### 3. Disease Detection
- Image-based disease identification
- Treatment recommendations
- Prevention strategies
- Expert consultation

### 4. Market Intelligence
- Real-time mandi prices
- Price trends and predictions
- Market alerts
- Historical price data

### 5. Expense Tracking
- Income/expense tracking
- Crop-wise expense analysis
- Profit/loss calculation
- Export to Excel/PDF

## Database Schema

### User Model
```javascript
{
  mobile: String,      // 10-digit mobile number
  name: String,        // User's full name
  email: String,       // Optional email
  profile: {
    farmSize: Number,   // in acres
    soilType: String,   // clay, sandy, loamy, black
    location: {
      state: String,
      district: String,
      coordinates: [Number] // [longitude, latitude]
    }
  }
}
```

### Crop Model
```javascript
{
  name: String,        // Crop name
  hindiName: String,    // Hindi name
  season: String,       // kharif, rabi, zaid
  soilTypes: [String],  // Suitable soil types
  waterRequirement: Number, // in mm
  duration: Number,     // days to harvest
  diseases: [Disease]   // Common diseases
}
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy with one click

### Self-Hosting
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## API Documentation

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Rate Limiting
- 100 requests per 15 minutes per IP
- 1000 requests per day per user

### Error Handling
All API responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "error": null
}
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License
MIT License - see LICENSE file for details

## Support
For support, email support@smartfarmer.com or create an issue in the repository.

## Acknowledgments
- Weather data from OpenWeatherMap
- Crop data from ICAR
- Market prices from AGMARKNET
- Disease data from ICAR-IIHR