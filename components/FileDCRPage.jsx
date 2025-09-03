'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ToggleSwitch';
import { ArrowLeft, Calendar, Users, Building, FileText, Plus, MapPin, Phone, X, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const FileDCRPage = () => {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('dateselection'); // 'dateselection', 'activitytype', 'customerlist', 'jointwork', 'dcrform'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activityType, setActivityType] = useState(''); // 'field' or 'nonfield'
  const [selectedTab, setSelectedTab] = useState('CIP DOCTOR');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [isJointWork, setIsJointWork] = useState(false);
  const [jointWorkDate, setJointWorkDate] = useState('');

  const tabs = ['CIP DOCTOR', 'CIP Non DOCTOR', 'PHARMACY', 'STOCKIST'];

  // Sample customer data with geo-tag status
  const customers = [
    { id: 1, name: 'ABHINEET BAJPAYEE', specialty: 'Cardiologist', geoTagged: true, lastVisit: '2024-01-10' },
    { id: 2, name: 'AJIT PRATAP SINGH', specialty: 'Neurologist', geoTagged: false, lastVisit: '2024-01-08' },
    { id: 3, name: 'DEEPTI CHATURVEDI', specialty: 'Pediatrician', geoTagged: true, lastVisit: '2024-01-15' },
    { id: 4, name: 'KAPIL SAXENA', specialty: 'Orthopedist', geoTagged: false, lastVisit: '2024-01-12' },
    { id: 5, name: 'DHEERAJ GOEL', specialty: 'Dermatologist', geoTagged: true, lastVisit: '2024-01-14' },
    { id: 6, name: 'A K CHATURVEDI', specialty: 'ENT Specialist', geoTagged: true, lastVisit: '2024-01-11' },
    { id: 7, name: 'NITYA NAND SINGH', specialty: 'Ophthalmologist', geoTagged: false, lastVisit: '2024-01-09' },
    { id: 8, name: 'MAMTA SHUKLA', specialty: 'Gynecologist', geoTagged: true, lastVisit: '2024-01-13' },
    { id: 9, name: 'BHUPENDRA BHATIYA', specialty: 'Psychiatrist', geoTagged: false, lastVisit: '2024-01-07' }
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleBack = () => {
    if (currentView === 'dcrform') {
      setCurrentView('customerlist');
    } else if (currentView === 'jointwork') {
      setCurrentView('customerlist');
    } else if (currentView === 'customerlist') {
      setCurrentView('activitytype');
    } else if (currentView === 'activitytype') {
      setCurrentView('dateselection');
    } else {
      router.push('/homepage');
    }
  };

  const handleDateSelect = () => {
    setCurrentView('activitytype');
  };

  const handleActivitySelect = (type) => {
    setActivityType(type);
    if (type === 'field') {
      setCurrentView('customerlist');
    } else {
      // For non-field activities, we could add a different flow
      setCurrentView('customerlist');
    }
  };

  const handleCustomerToggle = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer.geoTagged) return; // Can't select non-geo-tagged customers

    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleGeoTag = (customerId) => {
    // Simulate geo-tagging process
    alert(`Geo-tagging ${customers.find(c => c.id === customerId)?.name}...`);
    // In real app, this would trigger location services
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Date Selection View
  const DateSelectionView = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-semibold">DCR Filing</h1>
            </div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="sm" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Date Selection Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-8">Select Date</h2>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigateMonth(-1)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h3>
            <button onClick={() => navigateMonth(1)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={() => navigateDay(-1)} className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50">
                <ChevronLeft className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </button>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {selectedDate.getDate()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
              </div>

              <button onClick={() => navigateDay(1)} className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50">
                <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              {selectedDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleDateSelect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium text-lg shadow-lg transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Activity Type Selection View
  const ActivityTypeView = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-semibold">DCR Filing</h1>
            </div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="sm" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Selected Date Display */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6" />
            <div>
              <p className="text-sm opacity-90">Selected Date</p>
              <p className="text-lg font-semibold">
                {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </p>
            </div>
          </div>
        </div>

        {/* Activity Type Cards */}
        <div className="space-y-4">
          <button
            onClick={() => handleActivitySelect('field')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Field Activity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">DCR Reporting or field work</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Customer visits & field activities</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('nonfield')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Non-Field Activity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">All other meeting activities</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Office work, training & meetings</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // Customer List View
  const CustomerListView = () => {
    const geoTaggedCount = customers.filter(c => c.geoTagged).length;
    const hasSelectedCustomers = selectedCustomers.length > 0;
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <button onClick={handleBack} className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold">DCR Filing</h1>
                  <p className="text-xs opacity-75">
                    {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentView('jointwork')}
                  className="text-xs bg-white/20 px-2 py-1 rounded"
                >
                  MR LIST
                </button>
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Status Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Geo-tagged customers:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{geoTaggedCount}/{customers.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600 dark:text-gray-400">Selected for DCR:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedCustomers.length}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    selectedTab === tab
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search CIP Doctor"
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Customer List */}
          <div className="space-y-2">
            {customers.map((customer) => (
              <div key={customer.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      customer.geoTagged 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      <MapPin className={`h-5 w-5 ${
                        customer.geoTagged 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                        {customer.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {customer.specialty} • Last visit: {customer.lastVisit}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!customer.geoTagged && (
                      <button
                        onClick={() => handleGeoTag(customer.id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleCustomerToggle(customer.id)}
                      disabled={!customer.geoTagged}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        selectedCustomers.includes(customer.id)
                          ? 'bg-blue-600 text-white'
                          : customer.geoTagged
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {selectedCustomers.includes(customer.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Proceed Button */}
          {hasSelectedCustomers && (
            <div className="sticky bottom-4">
              <button 
                onClick={() => setCurrentView('dcrform')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium shadow-lg transition-all active:scale-95"
              >
                Proceed with {selectedCustomers.length} customer{selectedCustomers.length > 1 ? 's' : ''}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Joint Work View
  const JointWorkView = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">Joint Work</h1>
                <p className="text-xs opacity-75">16 July 2020</p>
              </div>
            </div>
            <button className="text-xs bg-white/20 px-2 py-1 rounded">
              MR LIST
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-t-xl px-4 py-3">
          <div className="flex justify-between">
            <span className="font-semibold">Customer Name</span>
            <span className="font-semibold">Contact Type</span>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white dark:bg-gray-800 rounded-b-xl min-h-96 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No joint work customers added yet</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors">
            Proceed
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-colors">
            As Per Plan
          </button>
        </div>
      </div>
    </div>
  );

  // Render current view
  if (currentView === 'dateselection') return <DateSelectionView />;
  if (currentView === 'activitytype') return <ActivityTypeView />;
  if (currentView === 'customerlist') return <CustomerListView />;
  if (currentView === 'jointwork') return <JointWorkView />;
  
  return <DateSelectionView />; // Default fallback
};

export default FileDCRPage;