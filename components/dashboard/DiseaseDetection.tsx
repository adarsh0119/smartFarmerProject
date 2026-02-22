'use client';

import { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, AlertTriangle, CheckCircle, X } from 'lucide-react';

const commonDiseases = [
  {
    id: 1,
    name: 'Leaf Rust',
    crop: 'Wheat',
    symptoms: 'Orange-brown pustules on leaves',
    treatment: 'Apply fungicide containing propiconazole',
    prevention: 'Use resistant varieties, avoid dense planting',
  },
  {
    id: 2,
    name: 'Blast',
    crop: 'Rice',
    symptoms: 'Spindle-shaped lesions on leaves',
    treatment: 'Apply tricyclazole or carbendazim',
    prevention: 'Use certified seeds, maintain proper spacing',
  },
  {
    id: 3,
    name: 'Downy Mildew',
    crop: 'Maize',
    symptoms: 'Yellow streaks on leaves, white fungal growth',
    treatment: 'Apply metalaxyl or mancozeb',
    prevention: 'Ensure good drainage, crop rotation',
  },
  {
    id: 4,
    name: 'Yellow Mosaic Virus',
    crop: 'Soybean',
    symptoms: 'Yellow mosaic pattern on leaves',
    treatment: 'Remove infected plants, control whiteflies',
    prevention: 'Use virus-free seeds, weed management',
  },
];

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Mock analysis result
          setAnalysisResult({
            disease: 'Leaf Rust',
            confidence: 87,
            crop: 'Wheat',
            description: 'Fungal disease affecting wheat leaves',
            treatment: [
              'Apply fungicide containing propiconazole (1ml/liter)',
              'Spray at 10-day intervals',
              'Remove severely infected leaves',
            ],
            prevention: [
              'Use resistant varieties like HD-2967',
              'Avoid dense planting',
              'Ensure proper drainage',
            ],
            severity: 'Moderate',
            immediateActions: [
              'Isolate affected plants',
              'Apply recommended fungicide within 24 hours',
              'Monitor nearby plants for symptoms',
            ],
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
          Disease Detection
        </h2>
        <button className="text-sm text-amber-600 hover:text-amber-800 font-medium">
          View History
        </button>
      </div>

      {/* Image Upload Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Upload Crop Image</h3>
          <span className="text-xs text-gray-500">Max 5MB • JPG, PNG</span>
        </div>

        {!selectedImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-400 transition-colors">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Upload an image of affected crop leaves</p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </button>
              
              <button
                onClick={handleCameraClick}
                className="flex items-center justify-center space-x-2 border border-amber-600 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Use Camera</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected crop"
                className="w-full h-48 object-cover"
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="spinner mx-auto mb-2 border-white border-t-white"></div>
                  <p>Analyzing... {uploadProgress}%</p>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedImage && !isAnalyzing && !analysisResult && (
          <button
            onClick={handleAnalyze}
            className="w-full mt-4 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            Analyze Image for Diseases
          </button>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-amber-800">Detection Result</h3>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {analysisResult.confidence}% Confidence
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Disease</p>
                <p className="font-semibold">{analysisResult.disease}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Crop</p>
                <p className="font-semibold">{analysisResult.crop}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Severity</p>
                <p className="font-semibold">{analysisResult.severity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Risk Level</p>
                <p className="font-semibold text-red-600">High</p>
              </div>
            </div>

            <p className="text-sm text-amber-700">{analysisResult.description}</p>
          </div>

          {/* Treatment & Prevention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Immediate Actions
              </h4>
              <ul className="space-y-1">
                {analysisResult.immediateActions.map((action: string, index: number) => (
                  <li key={index} className="text-sm text-red-700 flex items-start">
                    <span className="mr-2">•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Treatment
              </h4>
              <ul className="space-y-1">
                {analysisResult.treatment.map((item: string, index: number) => (
                  <li key={index} className="text-sm text-emerald-700 flex items-start">
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Prevention Measures</h4>
            <ul className="space-y-1">
              {analysisResult.prevention.map((item: string, index: number) => (
                <li key={index} className="text-sm text-blue-700 flex items-start">
                  <span className="mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Common Diseases */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Common Diseases in Your Area</h3>
        <div className="space-y-2">
          {commonDiseases.map((disease) => (
            <div key={disease.id} className="p-3 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{disease.name}</h4>
                  <p className="text-sm text-gray-600">{disease.crop} • {disease.symptoms}</p>
                </div>
                <button className="text-sm text-amber-600 hover:text-amber-800 font-medium">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}