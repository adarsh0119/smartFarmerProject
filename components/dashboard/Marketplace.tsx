'use client';

import { useState } from 'react';
import { Store, ShoppingCart, Plus, Search, Filter, MapPin, Phone, User, X } from 'lucide-react';

interface MarketItem {
  id: number;
  type: 'खरीदें' | 'बेचें';
  category: string;
  item: string;
  price: number;
  unit: string;
  quantity: string;
  seller: string;
  location: string;
  phone: string;
  description: string;
  postedDate: string;
}

const marketItems: MarketItem[] = [
  {
    id: 1,
    type: 'बेचें',
    category: 'अनाज',
    item: 'गेहूं',
    price: 2100,
    unit: 'क्विंटल',
    quantity: '50 क्विंटल',
    seller: 'राजेश कुमार',
    location: 'आपके आस-पास',
    phone: '9876543210',
    description: 'उच्च गुणवत्ता वाला गेहूं, ताजा कटाई',
    postedDate: '2 दिन पहले'
  },
  {
    id: 2,
    type: 'खरीदें',
    category: 'उर्वरक',
    item: 'यूरिया',
    price: 280,
    unit: 'बोरी',
    quantity: '100 बोरी',
    seller: 'सुरेश एग्रो स्टोर',
    location: 'आपके आस-पास',
    phone: '9876543211',
    description: 'सरकारी दर पर यूरिया उपलब्ध',
    postedDate: '1 दिन पहले'
  },
  {
    id: 3,
    type: 'बेचें',
    category: 'सब्जी',
    item: 'टमाटर',
    price: 25,
    unit: 'किलो',
    quantity: '500 किलो',
    seller: 'मोहन सिंह',
    location: 'आपके आस-पास',
    phone: '9876543212',
    description: 'ताजा टमाटर, थोक में उपलब्ध',
    postedDate: '3 घंटे पहले'
  },
  {
    id: 4,
    type: 'खरीदें',
    category: 'बीज',
    item: 'धान के बीज',
    price: 1200,
    unit: 'किलो',
    quantity: '20 किलो',
    seller: 'किसान बीज भंडार',
    location: 'आपके आस-पास',
    phone: '9876543213',
    description: 'प्रमाणित धान के बीज, उच्च उपज',
    postedDate: '5 दिन पहले'
  },
  {
    id: 5,
    type: 'बेचें',
    category: 'अनाज',
    item: 'धान',
    price: 2050,
    unit: 'क्विंटल',
    quantity: '30 क्विंटल',
    seller: 'विक्रम यादव',
    location: 'आपके आस-पास',
    phone: '9876543214',
    description: 'बासमती धान, अच्छी गुणवत्ता',
    postedDate: '1 दिन पहले'
  },
  {
    id: 6,
    type: 'खरीदें',
    category: 'कीटनाशक',
    item: 'कीटनाशक स्प्रे',
    price: 450,
    unit: 'लीटर',
    quantity: '50 लीटर',
    seller: 'अग्रो केमिकल्स',
    location: 'आपके आस-पास',
    phone: '9876543215',
    description: 'सभी प्रकार के कीटनाशक उपलब्ध',
    postedDate: '2 दिन पहले'
  },
  {
    id: 7,
    type: 'बेचें',
    category: 'सब्जी',
    item: 'प्याज',
    price: 30,
    unit: 'किलो',
    quantity: '1000 किलो',
    seller: 'रामप्रसाद',
    location: 'आपके आस-पास',
    phone: '9876543216',
    description: 'लाल प्याज, थोक भाव',
    postedDate: '6 घंटे पहले'
  },
  {
    id: 8,
    type: 'खरीदें',
    category: 'उपकरण',
    item: 'ट्रैक्टर किराए पर',
    price: 800,
    unit: 'दिन',
    quantity: 'उपलब्ध',
    seller: 'किसान सेवा केंद्र',
    location: 'आपके आस-पास',
    phone: '9876543217',
    description: 'सभी प्रकार के कृषि उपकरण किराए पर',
    postedDate: '4 दिन पहले'
  }
];

export default function Marketplace() {
  const [selectedType, setSelectedType] = useState<'सभी' | 'खरीदें' | 'बेचें'>('सभी');
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [items, setItems] = useState<MarketItem[]>(marketItems);
  
  // Form state for adding new advertisement
  const [formData, setFormData] = useState({
    type: 'बेचें' as 'खरीदें' | 'बेचें',
    category: '',
    item: '',
    price: '',
    unit: 'क्विंटल',
    quantity: '',
    seller: '',
    location: '',
    phone: '',
    description: ''
  });

  const categories = ['सभी', 'अनाज', 'सब्जी', 'उर्वरक', 'बीज', 'कीटनाशक', 'उपकरण', 'फल', 'दलहन', 'तिलहन', 'मसाला'];
  const units = ['क्विंटल', 'किलो', 'बोरी', 'लीटर', 'दिन', 'पीस'];

  // Products by category
  const productsByCategory: { [key: string]: string[] } = {
    'अनाज': ['गेहूं', 'धान', 'मक्का', 'बाजरा', 'ज्वार', 'जौ'],
    'दलहन': ['चना', 'मटर', 'मसूर', 'मूंग', 'उड़द', 'अरहर'],
    'तिलहन': ['सरसों', 'सोयाबीन', 'मूंगफली', 'सूरजमुखी', 'अलसी', 'तिल'],
    'सब्जी': ['आलू', 'टमाटर', 'प्याज', 'बैंगन', 'मिर्च', 'गोभी', 'भिंडी', 'खरबूजा', 'तरबूज', 'खीरा', 'लौकी', 'तोरई', 'करेला', 'कद्दू', 'ग्वार', 'चौलाई', 'पालक', 'गाजर', 'मूली', 'मेथी', 'धनिया', 'लहसुन', 'शिमला मिर्च', 'बंद गोभी', 'ब्रोकली', 'चुकंदर', 'शकरकंद', 'अरबी', 'सेम'],
    'फल': ['केला', 'पपीता', 'अनानास', 'आम', 'अमरूद', 'नींबू', 'अंगूर', 'अनार'],
    'मसाला': ['हल्दी', 'अदरक', 'लाल मिर्च', 'जीरा', 'काली मिर्च', 'धनिया'],
    'उर्वरक': ['यूरिया', 'डीएपी', 'एनपीके', 'पोटाश', 'जिंक सल्फेट', 'गोबर खाद', 'वर्मी कम्पोस्ट'],
    'बीज': ['गेहूं के बीज', 'धान के बीज', 'मक्का के बीज', 'सब्जी के बीज', 'फूल के बीज'],
    'कीटनाशक': ['कीटनाशक स्प्रे', 'फफूंदनाशक', 'खरपतवार नाशक', 'जैविक कीटनाशक'],
    'उपकरण': ['ट्रैक्टर', 'थ्रेशर', 'स्प्रेयर', 'कल्टीवेटर', 'हल', 'सीड ड्रिल', 'पंप सेट']
  };

  // Get products for selected category
  const getProductsForCategory = () => {
    if (!formData.category || formData.category === 'सभी') {
      // Return all products
      return Object.values(productsByCategory).flat();
    }
    return productsByCategory[formData.category] || [];
  };

  const handleAddAdvertisement = () => {
    // Validate form
    if (!formData.category || !formData.item || !formData.price || !formData.quantity || !formData.seller || !formData.location || !formData.phone || !formData.description) {
      alert('कृपया सभी फ़ील्ड भरें');
      return;
    }

    // Validate phone number
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      alert('कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें');
      return;
    }

    // Create new item
    const newItem: MarketItem = {
      id: items.length + 1,
      type: formData.type,
      category: formData.category,
      item: formData.item,
      price: parseFloat(formData.price),
      unit: formData.unit,
      quantity: formData.quantity,
      seller: formData.seller,
      location: formData.location,
      phone: formData.phone,
      description: formData.description,
      postedDate: 'अभी'
    };

    // Add to items list
    setItems([newItem, ...items]);
    
    // Reset form
    setFormData({
      type: 'बेचें',
      category: '',
      item: '',
      price: '',
      unit: 'क्विंटल',
      quantity: '',
      seller: '',
      location: '',
      phone: '',
      description: ''
    });
    
    setShowAddModal(false);
    alert('आपका विज्ञापन सफलतापूर्वक जोड़ा गया!');
  };

  const filteredItems = items.filter(item => {
    const matchesType = selectedType === 'सभी' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'सभी' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Store className="w-5 h-5 mr-2 text-orange-500" />
            बाजार
          </h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1 text-sm bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>विज्ञापन दें</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 space-y-3">
          {/* Type Filter */}
          <div className="flex gap-2">
            {(['सभी', 'खरीदें', 'बेचें'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="उत्पाद खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Market Items */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'बेचें' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.item}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-orange-600">₹{item.price}</p>
                  <p className="text-xs text-gray-500">प्रति {item.unit}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  <span>{item.quantity}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-orange-200">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  <span>{item.seller}</span>
                </div>
                <span className="text-xs text-gray-500">{item.postedDate}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Store className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>कोई उत्पाद नहीं मिला</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">विवरण</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedItem.type === 'बेचें' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedItem.type}
                  </span>
                  <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                    {selectedItem.category}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{selectedItem.item}</h4>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  ₹{selectedItem.price} <span className="text-sm text-gray-500">/ {selectedItem.unit}</span>
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-gray-500">मात्रा</p>
                  <p className="font-semibold text-gray-900">{selectedItem.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">विवरण</p>
                  <p className="text-sm text-gray-700">{selectedItem.description}</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center text-gray-700">
                  <User className="w-5 h-5 mr-2 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">विक्रेता</p>
                    <p className="font-semibold">{selectedItem.seller}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">स्थान</p>
                    <p className="font-semibold">{selectedItem.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-2 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">संपर्क</p>
                    <p className="font-semibold">{selectedItem.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <a
                  href={`tel:${selectedItem.phone}`}
                  className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>कॉल करें</span>
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  बंद करें
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                पोस्ट किया गया: {selectedItem.postedDate}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">विज्ञापन दें</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  विज्ञापन का प्रकार *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'बेचें' })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.type === 'बेचें'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ShoppingCart className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">बेचना है</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'खरीदें' })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.type === 'खरीदें'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Store className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">खरीदना है</div>
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  श्रेणी *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, item: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">श्रेणी चुनें</option>
                  {categories.filter(c => c !== 'सभी').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  उत्पाद का नाम *
                </label>
                <select
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">उत्पाद चुनें</option>
                  {getProductsForCategory().map((product) => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.category ? `${formData.category} की सूची` : 'पहले श्रेणी चुनें'}
                </p>
              </div>

              {/* Price and Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मूल्य (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="2000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    इकाई *
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मात्रा *
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="जैसे: 50 क्विंटल, 100 बोरी"
                  required
                />
              </div>

              {/* Seller Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  आपका नाम *
                </label>
                <input
                  type="text"
                  value={formData.seller}
                  onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="आपका पूरा नाम"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  स्थान *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="गांव/शहर, जिला, राज्य"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मोबाइल नंबर *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="10 अंकों का मोबाइल नंबर"
                  maxLength={10}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  विवरण *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="उत्पाद के बारे में विस्तार से बताएं..."
                  rows={3}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  रद्द करें
                </button>
                <button
                  onClick={handleAddAdvertisement}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  विज्ञापन प्रकाशित करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
