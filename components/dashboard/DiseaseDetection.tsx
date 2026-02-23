'use client';

import { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, AlertTriangle, CheckCircle, X } from 'lucide-react';

const commonDiseases = [
  {
    id: 1,
    name: 'पत्ती का रतुआ',
    crop: 'गेहूं',
    symptoms: 'पत्तियों पर नारंगी-भूरे रंग के दाने',
    treatment: 'प्रोपिकोनाज़ोल युक्त फफूंदनाशक का प्रयोग करें',
    prevention: 'प्रतिरोधी किस्मों का उपयोग करें, घनी बुवाई से बचें',
  },
  {
    id: 2,
    name: 'ब्लास्ट रोग',
    crop: 'धान',
    symptoms: 'पत्तियों पर धुरी के आकार के घाव',
    treatment: 'ट्राइसाइक्लाज़ोल या कार्बेन्डाज़िम का प्रयोग करें',
    prevention: 'प्रमाणित बीज का उपयोग करें, उचित दूरी बनाए रखें',
  },
  {
    id: 3,
    name: 'डाउनी मिल्ड्यू',
    crop: 'मक्का',
    symptoms: 'पत्तियों पर पीली धारियां, सफेद फफूंद की वृद्धि',
    treatment: 'मेटालैक्सिल या मैनकोज़ेब का प्रयोग करें',
    prevention: 'अच्छी जल निकासी सुनिश्चित करें, फसल चक्र अपनाएं',
  },
  {
    id: 4,
    name: 'पीला मोज़ेक वायरस',
    crop: 'सोयाबीन',
    symptoms: 'पत्तियों पर पीले मोज़ेक पैटर्न',
    treatment: 'संक्रमित पौधों को हटाएं, सफेद मक्खी को नियंत्रित करें',
    prevention: 'वायरस मुक्त बीज का उपयोग करें, खरपतवार प्रबंधन करें',
  },
  {
    id: 5,
    name: 'अगेती झुलसा',
    crop: 'टमाटर',
    symptoms: 'पत्तियों पर गहरे भूरे धब्बे, निशान के साथ',
    treatment: 'मैनकोज़ेब या क्लोरोथैलोनिल का छिड़काव करें',
    prevention: 'फसल चक्र अपनाएं, संक्रमित पत्तियों को हटाएं',
  },
  {
    id: 6,
    name: 'पाउडरी मिल्ड्यू',
    crop: 'मटर',
    symptoms: 'पत्तियों पर सफेद पाउडर जैसी परत',
    treatment: 'सल्फर या ट्राइडेमॉर्फ का प्रयोग करें',
    prevention: 'उचित हवा संचार बनाए रखें, अधिक नमी से बचें',
  },
  {
    id: 7,
    name: 'जीवाणु झुलसा',
    crop: 'धान',
    symptoms: 'पत्तियों पर पानी जैसे धब्बे, पीले किनारे',
    treatment: 'कॉपर ऑक्सीक्लोराइड का छिड़काव करें',
    prevention: 'स्वस्थ बीज का उपयोग करें, खेत में पानी का प्रबंधन करें',
  },
  {
    id: 8,
    name: 'फल सड़न',
    crop: 'मिर्च',
    symptoms: 'फलों पर काले धब्बे, सड़न',
    treatment: 'कार्बेन्डाज़िम या थायोफैनेट मिथाइल का प्रयोग करें',
    prevention: 'अच्छी जल निकासी, संक्रमित फलों को हटाएं',
  },
];

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDisease, setSelectedDisease] = useState<number | null>(null);
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
            disease: 'पत्ती का रतुआ',
            confidence: 87,
            crop: 'गेहूं',
            description: 'गेहूं की पत्तियों को प्रभावित करने वाला फफूंद रोग',
            treatment: [
              'प्रोपिकोनाज़ोल युक्त फफूंदनाशक का छिड़काव करें (1 मिली/लीटर)',
              '10 दिन के अंतराल पर छिड़काव करें',
              'गंभीर रूप से संक्रमित पत्तियों को हटा दें',
            ],
            prevention: [
              'एचडी-2967 जैसी प्रतिरोधी किस्मों का उपयोग करें',
              'घनी बुवाई से बचें',
              'उचित जल निकासी सुनिश्चित करें',
            ],
            severity: 'मध्यम',
            riskLevel: 'उच्च',
            immediateActions: [
              'प्रभावित पौधों को अलग करें',
              '24 घंटे के भीतर अनुशंसित फफूंदनाशक का प्रयोग करें',
              'आस-पास के पौधों में लक्षणों की निगरानी करें',
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
          रोग पहचान
        </h2>
        <button className="text-sm text-amber-600 hover:text-amber-800 font-medium">
          इतिहास देखें
        </button>
      </div>

      {/* Image Upload Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">फसल की तस्वीर अपलोड करें</h3>
          <span className="text-xs text-gray-500">अधिकतम 5MB • JPG, PNG</span>
        </div>

        {!selectedImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-400 transition-colors">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">प्रभावित फसल की पत्तियों की तस्वीर अपलोड करें</p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>तस्वीर अपलोड करें</span>
              </button>
              
              <button
                onClick={handleCameraClick}
                className="flex items-center justify-center space-x-2 border border-amber-600 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>कैमरा उपयोग करें</span>
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
                  <p>विश्लेषण हो रहा है... {uploadProgress}%</p>
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
            रोगों के लिए तस्वीर का विश्लेषण करें
          </button>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-amber-800">पहचान परिणाम</h3>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {analysisResult.confidence}% विश्वसनीयता
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">रोग</p>
                <p className="font-semibold">{analysisResult.disease}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">फसल</p>
                <p className="font-semibold">{analysisResult.crop}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">गंभीरता</p>
                <p className="font-semibold">{analysisResult.severity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">जोखिम स्तर</p>
                <p className="font-semibold text-red-600">{analysisResult.riskLevel}</p>
              </div>
            </div>

            <p className="text-sm text-amber-700">{analysisResult.description}</p>
          </div>

          {/* Treatment & Prevention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                तत्काल कार्रवाई
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
                उपचार
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
            <h4 className="font-semibold text-blue-800 mb-2">रोकथाम के उपाय</h4>
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
        <h3 className="font-semibold mb-3">आपके क्षेत्र में आम रोग</h3>
        <div className="space-y-2">
          {commonDiseases.map((disease) => (
            <div key={disease.id}>
              <div 
                className="p-3 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors cursor-pointer"
                onClick={() => setSelectedDisease(selectedDisease === disease.id ? null : disease.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{disease.name}</h4>
                    <p className="text-sm text-gray-600">{disease.crop} • {disease.symptoms}</p>
                  </div>
                  <button className="text-sm text-amber-600 hover:text-amber-800 font-medium">
                    {selectedDisease === disease.id ? 'छिपाएं' : 'विवरण'}
                  </button>
                </div>
              </div>

              {/* Disease Details - Expandable */}
              {selectedDisease === disease.id && (
                <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
                  <div>
                    <h5 className="font-semibold text-amber-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      लक्षण
                    </h5>
                    <p className="text-sm text-amber-700">{disease.symptoms}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      उपचार
                    </h5>
                    <p className="text-sm text-green-700">{disease.treatment}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      रोकथाम
                    </h5>
                    <p className="text-sm text-blue-700">{disease.prevention}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}