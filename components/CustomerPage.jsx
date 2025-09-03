'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ToggleSwitch';
import { ArrowLeft, Search, ChevronDown, Users, MapPin, ChevronRight } from 'lucide-react';

const CustomerPage = () => {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('mrlist');
  const [selectedMR, setSelectedMR] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('CIP DOCTOR');

  const mrList = [
    { id: 1, name: 'Chandan Verma', territory: 'North Zone', active: true },
    { id: 2, name: 'Deepak Chandani', territory: 'Central Zone', active: true },
    { id: 3, name: 'Rajesh Kumar', territory: 'South Zone', active: true },
    { id: 4, name: 'Priya Singh', territory: 'East Zone', active: true },
    { id: 5, name: 'Amit Sharma', territory: 'West Zone', active: false }
  ];

  const areaData = [
    { id: 1, name: 'AZAMGARH MAIN MARKET', count: 0, expanded: false },
    { id: 2, name: 'BETIAHAHAT ROAD', count: 27, expanded: false },
    { id: 3, name: 'BUDHH VIHAR', count: 19, expanded: false },
    { id: 4, name: 'FATIMA ROAD PADRI BAZAR', count: 3, expanded: false },
    { id: 5, name: 'GANDI GALI GOLGHAR', count: 25, expanded: false },
    { id: 6, name: 'GORAKHNATH ROAD', count: 17, expanded: false },
    { id: 7, name: 'MEDICAL COLLEGE ROAD', count: 59, expanded: false },
    { id: 8, name: 'MOHHADIPUR', count: 11, expanded: false }
  ];

  const [areas, setAreas] = useState(areaData);
  const tabs = ['CIP DOCTOR', 'CIP NON DOCTOR', 'PHARMACY', 'STOCKIST/DIS'];

  const filteredMRs = mrList.filter(mr => 
    mr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mr.territory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMRSelect = (mr) => {
    setSelectedMR(mr.name);
    setCurrentView('customerlisting');
  };

  const handleBack = () => {
    if (currentView === 'customerlisting') {
      setCurrentView('mrlist');
    } else {
      router.push('/homepage');
    }
  };

  const toggleArea = (areaId) => {
    setAreas(areas.map(area => 
      area.id === areaId 
        ? { ...area, expanded: !area.expanded }
        : area
    ));
  };

  // MR List Screen - Mobile Optimized
  const MRListScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Fixed Header with safe area */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="safe-top px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <button 
                onClick={handleBack} 
                className="mr-2 sm:mr-3 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors touch-manipulation"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold truncate">MR List</h1>
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle 
                isDark={isDark} 
                toggleTheme={toggleTheme} 
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content with proper top spacing */}
      <div className="pt-20 sm:pt-24">
        {/* Search Section */}
        <div className="px-3 py-4 sm:px-4">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search MR..."
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* MR List */}
        <div className="px-3 pb-6 sm:px-4 space-y-2 sm:space-y-3">
          {filteredMRs.map((mr) => (
            <div
              key={mr.id}
              onClick={() => handleMRSelect(mr)}
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {mr.active && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium sm:font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">{mr.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{mr.territory}</p>
                    <div className="flex items-center mt-1">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 ${mr.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {mr.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2" />
              </div>
            </div>
          ))}
        </div>

        {filteredMRs.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No MRs found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );

  // Customer Listing Screen - Mobile Optimized
  const CustomerListingScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="safe-top px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <button 
                onClick={handleBack} 
                className="mr-2 sm:mr-3 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors touch-manipulation"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold truncate">Customer Listing</h1>
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle 
                isDark={isDark} 
                toggleTheme={toggleTheme} 
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 sm:pt-24 px-3 sm:px-4 pb-6">
        {/* MR Name Display */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Selected MR</p>
              <p className="font-medium sm:font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">{selectedMR}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Scrollable on mobile */}
        <div className="mb-3 sm:mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-1.5 sm:p-2 shadow-sm border dark:border-gray-700 overflow-hidden">
            <div className="flex space-x-0.5 sm:space-x-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-2 sm:px-3 py-2 sm:py-2.5 text-xs font-medium rounded-md sm:rounded-lg transition-all whitespace-nowrap touch-manipulation ${
                    activeTab === tab
                      ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Area/Patch Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-t-lg sm:rounded-t-xl px-3 sm:px-4 py-3 sm:py-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="font-medium sm:font-semibold text-sm sm:text-base">Area/Patch</span>
            <span className="font-medium sm:font-semibold text-sm sm:text-base">Count</span>
          </div>
        </div>

        {/* Areas List */}
        <div className="bg-white dark:bg-gray-800 rounded-b-lg sm:rounded-b-xl shadow-sm overflow-hidden border-x border-b dark:border-gray-700">
          {areas.map((area, index) => (
            <div key={area.id} className={index !== areas.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}>
              <div
                onClick={() => toggleArea(area.id)}
                className="flex items-center justify-between p-3 sm:p-4 active:bg-gray-50 dark:active:bg-gray-700 cursor-pointer transition-colors touch-manipulation"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <ChevronDown 
                    className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      area.expanded ? 'rotate-0' : '-rotate-90'
                    }`} 
                  />
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{area.name}</span>
                </div>
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ml-2 ${
                  area.count > 0 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {area.count}
                </div>
              </div>
              
              {area.expanded && (
                <div className="bg-gray-50 dark:bg-gray-700 px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-100 dark:border-gray-600">
                  <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${area.count > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {area.count > 0 
                        ? `${area.count} doctors available in this area`
                        : 'No doctors found in this area'
                      }
                    </p>
                  </div>
                  {area.count > 0 && (
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm rounded-md sm:rounded-lg transition-colors touch-manipulation">
                      View Doctors
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return currentView === 'mrlist' ? <MRListScreen /> : <CustomerListingScreen />;
};

export default CustomerPage;