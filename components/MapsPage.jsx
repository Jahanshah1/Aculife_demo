// components/MapsPage.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Navigation, Users, Plus, X } from 'lucide-react';

const MapsPage = () => {
  const router = useRouter();
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [selectedCustomerType, setSelectedCustomerType] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  // Sample customer data - replace with actual API data
  const [customers] = useState([
    {
      id: 1,
      name: 'RAJNEESH KUMAR CHATURVEDI',
      type: 'doctor',
      qualification: 'OTHERS',
      specialty: 'SURGEON',
      class: 'A+',
      frequency: '2 VISIT',
      visitDates: 'Not Visited',
      lat: 28.7041,
      lng: 77.1025,
      address: 'Bandra Terminal Parking Area'
    },
    {
      id: 2,
      name: 'RANA UMANG PHARMACY',
      type: 'pharmacy',
      contactName: 'SUNIL SINGH',
      mobile: '9999999999',
      marketArea: 'MEDICAL COLLEGE ROAD',
      state: 'UTTAR PRADESH',
      visitDates: 'Not Visited',
      lat: 28.7045,
      lng: 77.1030,
      address: 'Medical College Road'
    },
    {
      id: 3,
      name: 'MEDICAL DISTRIBUTORS PVT LTD',
      type: 'stockist',
      contactName: 'AMIT SHARMA',
      mobile: '9876543210',
      marketArea: 'CENTRAL DELHI',
      state: 'DELHI',
      visitDates: 'Last visited: 15 days ago',
      lat: 28.7050,
      lng: 77.1035,
      address: 'Central Delhi Distribution Center'
    }
  ]);

  const customerTypes = [
    { id: 'all', name: 'All', icon: MapPin, color: 'bg-gray-500', count: customers.length },
    { id: 'doctor', name: 'Doctor', icon: Plus, color: 'bg-blue-500', count: customers.filter(c => c.type === 'doctor').length },
    { id: 'pharmacy', name: 'Pharmacy', icon: Plus, color: 'bg-purple-600', count: customers.filter(c => c.type === 'pharmacy').length },
    { id: 'stockist', name: 'Stockist', icon: Plus, color: 'bg-purple-800', count: customers.filter(c => c.type === 'stockist').length }
  ];

  // Request GPS permission and get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPermission('denied');
          // Fallback to Delhi coordinates
          setUserLocation({
            lat: 28.7041,
            lng: 77.1025
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  }, []);

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  // Check if customer is within 300m range
  const isWithinRange = (customer) => {
    if (!userLocation) return false;
    const distance = calculateDistance(
      userLocation.lat, userLocation.lng,
      customer.lat, customer.lng
    );
    return distance <= 300;
  };

  // Filter customers based on selected type
  const filteredCustomers = selectedCustomerType === 'all' 
    ? customers 
    : customers.filter(c => c.type === selectedCustomerType);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const handleFileDCR = () => {
    router.push('/filedcr');
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case 'doctor': return 'bg-blue-500';
      case 'pharmacy': return 'bg-purple-600';
      case 'stockist': return 'bg-purple-800';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Maps</h1>
            <button
              className="ml-auto p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    setUserLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    });
                  });
                }
              }}
            >
              <Navigation className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="pt-20 h-screen">
        {/* GPS Permission Request */}
        {locationPermission === 'prompt' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 m-4 max-w-sm">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Enable Location Access
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We need access to your location to show nearby customers within 300m range.
                </p>
                <button
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                          });
                          setLocationPermission('granted');
                        },
                        () => setLocationPermission('denied')
                      );
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enable GPS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mock Map View */}
        <div className="relative h-3/5 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          {/* Location Circle (300m radius visualization) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 border-4 border-blue-400 border-opacity-30 rounded-full bg-blue-200 bg-opacity-20 flex items-center justify-center">
              {/* User Location Pin */}
              <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg relative">
                <div className="absolute -inset-2 bg-green-400 rounded-full animate-ping opacity-30"></div>
              </div>
            </div>
          </div>

          {/* Customer Markers */}
          {filteredCustomers.map((customer, index) => (
            <div
              key={customer.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                top: `${45 + (index * 15)}%`,
                left: `${45 + (index * 10)}%`
              }}
              onClick={() => handleCustomerClick(customer)}
            >
              <div className={`w-8 h-8 ${getMarkerColor(customer.type)} rounded-full border-2 border-white shadow-lg flex items-center justify-center relative`}>
                <MapPin className="h-4 w-4 text-white" />
                {isWithinRange(customer) && (
                  <div className="absolute -inset-1 bg-green-400 rounded-full animate-pulse opacity-50"></div>
                )}
              </div>
            </div>
          ))}

          {/* Map Labels */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs shadow">
              <span className="text-gray-600 dark:text-gray-400">300m Range</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs shadow">
              <span className="text-gray-600 dark:text-gray-400">
                {filteredCustomers.filter(isWithinRange).length} customers nearby
              </span>
            </div>
          </div>
        </div>

        {/* Customer Type Filter */}
        <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex overflow-x-auto py-3 px-4 space-x-3">
            {customerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedCustomerType(type.id)}
                className={`flex flex-col items-center min-w-16 py-2 px-3 rounded-lg transition-colors ${
                  selectedCustomerType === type.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`w-8 h-8 ${type.color} rounded-full flex items-center justify-center mb-1`}>
                  <type.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                  {type.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl w-full max-w-md mx-4 mb-0 max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {selectedCustomer.name}
                </h3>
                <button
                  onClick={() => setShowCustomerDetails(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {selectedCustomer.type === 'doctor' ? (
                <>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Qualification:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.qualification}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Specialty:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.specialty}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Class:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.class}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Frequency:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.frequency}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Contact Name:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.contactName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Mobile:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.mobile}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Market Area:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.marketArea}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">State:</span>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.state}</p>
                  </div>
                </>
              )}
              
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Visit Dates:</span>
                <p className="font-medium text-gray-800 dark:text-gray-200">{selectedCustomer.visitDates}</p>
              </div>

              {/* File DCR Button */}
              <div className="pt-4">
                <button
                  onClick={handleFileDCR}
                  disabled={!isWithinRange(selectedCustomer)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    isWithinRange(selectedCustomer)
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isWithinRange(selectedCustomer) ? 'FILE DCR' : 'OUT OF RANGE - FILE DCR DISABLED'}
                </button>
                {!isWithinRange(selectedCustomer) && (
                  <p className="text-xs text-red-500 mt-2 text-center">
                    Customer is outside 300m range
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapsPage;