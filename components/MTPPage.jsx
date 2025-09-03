'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ToggleSwitch';
import { ArrowLeft, Calendar, MapPin, Users, Info, ChevronLeft, ChevronRight, Plus, Clock, Target } from 'lucide-react';

const MTPPage = () => {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedArea, setSelectedArea] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeTab, setActiveTab] = useState('CIP DOCTOR');

  const areas = [
    'BETIAHAHAT ROAD',
    'BUDHH VIHAR', 
    'GORAKHNATH ROAD',
    'AZAMGARH MAIN MARKET',
    'MEDICAL COLLEGE ROAD',
    'MOHHADIPUR'
  ];

  const tabs = ['CIP DOCTOR', 'CIP NON DOCTOR', 'PHARMACY', 'STOCKIST'];

  const doctorsList = [
    { id: 1, name: 'AMIT MISHRA', specialty: 'Cardiologist', lastVisit: '2024-01-15', priority: 'high' },
    { id: 2, name: 'ANAND KUMAR AGRAWAL', specialty: 'Neurologist', lastVisit: '2024-01-10', priority: 'medium' },
    { id: 3, name: 'RAJESH SRIVASTAV', specialty: 'Orthopedist', lastVisit: '2024-01-12', priority: 'high' },
    { id: 4, name: 'AZIZ AHMAD', specialty: 'Pediatrician', lastVisit: '2024-01-08', priority: 'low' },
    { id: 5, name: 'LAYAK AHEMAD', specialty: 'Dermatologist', lastVisit: '2024-01-14', priority: 'medium' },
    { id: 6, name: 'V N SINGH', specialty: 'ENT Specialist', lastVisit: '2024-01-11', priority: 'high' },
    { id: 7, name: 'SATISH KUMAR', specialty: 'Ophthalmologist', lastVisit: '2024-01-09', priority: 'low' },
    { id: 8, name: 'SANJU SHARMA', specialty: 'Gynecologist', lastVisit: '2024-01-13', priority: 'medium' }
  ];

  // Mobile-optimized calendar data
  const calendarData = {
    1: { total: 19, types: { dr: 9, cn: 2, ph: 8, st: 0 }, status: 'planned' },
    2: { total: 15, types: { dr: 9, cn: 5, ph: 1, st: 0 }, status: 'completed' },
    3: { total: 12, types: { dr: 9, cn: 3, ph: 0, st: 0 }, status: 'planned' },
    4: { total: 18, types: { dr: 17, cn: 0, ph: 1, st: 0 }, status: 'pending' },
    6: { total: 12, types: { dr: 4, cn: 8, ph: 0, st: 0 }, status: 'completed' },
    7: { total: 5, types: { dr: 5, cn: 0, ph: 0, st: 0 }, status: 'planned' },
    8: { total: 12, types: { dr: 1, cn: 3, ph: 8, st: 0 }, status: 'planned' },
    9: { total: 9, types: { dr: 9, cn: 0, ph: 0, st: 0 }, status: 'completed' },
    10: { total: 11, types: { dr: 6, cn: 5, ph: 0, st: 0 }, status: 'planned' },
    11: { total: 14, types: { dr: 0, cn: 2, ph: 12, st: 0 }, status: 'pending' }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const handleDateClick = (day) => {
    if (day && calendarData[day]) {
      setSelectedDate(day);
      setCurrentView('areaselection');
    }
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setCurrentView('mtplisting');
  };

  const handleBack = () => {
    if (currentView === 'mtplisting') {
      setCurrentView('areaselection');
    } else if (currentView === 'areaselection') {
      setCurrentView('calendar');
    } else {
      router.push('/homepage');
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700';
      case 'planned': return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700';
      default: return 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  // Mobile-First Calendar View
  const CalendarView = () => {
    const days = getDaysInMonth(currentMonth);
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button onClick={handleBack} className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-lg font-semibold">MTP</h1>
              </div>
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="sm" />
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Month Navigation - Compact for Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigateMonth(-1)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {shortMonthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button onClick={() => navigateMonth(1)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Weekday Headers - Single Letter for Mobile */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="h-8 flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid - Optimized for Mobile */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day ? (
                    <button
                      onClick={() => handleDateClick(day)}
                      disabled={!calendarData[day]}
                      className={`w-full h-full p-1 rounded-lg text-xs transition-all ${
                        calendarData[day] 
                          ? `${getStatusColor(calendarData[day].status)} hover:scale-105 active:scale-95 cursor-pointer`
                          : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="font-semibold text-sm mb-0.5">{day}</span>
                        {calendarData[day] && (
                          <div className="flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 rounded-full px-1.5 py-0.5 min-w-0">
                              {calendarData[day].total}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Stats Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">12</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Planned Days</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">147</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total Visits</div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Legend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Status Legend</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Planned</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile-Optimized Area Selection
  const AreaSelectionView = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-semibold">Select Area</h1>
            </div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="sm" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Selected Date Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6" />
            <div>
              <p className="text-sm opacity-90">Selected Date</p>
              <p className="text-lg font-semibold">
                {selectedDate} {shortMonthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </p>
              <p className="text-xs opacity-75">
                {calendarData[selectedDate]?.total || 0} visits planned
              </p>
            </div>
          </div>
        </div>

        {/* Areas List */}
        <div className="space-y-2">
          {areas.map((area, index) => (
            <button
              key={index}
              onClick={() => handleAreaSelect(area)}
              className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{area}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.floor(Math.random() * 15) + 5} customers
                    </p>
                  </div>
                </div>
                <ArrowLeft className="h-4 w-4 rotate-180 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Mobile-Optimized MTP Listing
  const MTPListingView = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <button onClick={handleBack} className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-semibold truncate">Visit List</h1>
            </div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} size="sm" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Context Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Date:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {selectedDate} {shortMonthNames[currentMonth.getMonth()]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Area:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100 text-right truncate ml-2">
                {selectedArea}
              </span>
            </div>
          </div>
        </div>

        {/* Compact Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.replace('CIP ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List - Mobile Optimized */}
        <div className="space-y-2">
          {doctorsList.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {doctor.specialty}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{doctor.lastVisit}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(doctor.priority)}`}>
                        {doctor.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors ml-2">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Visit Button */}
        <div className="sticky bottom-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-medium shadow-lg transition-all active:scale-95">
            <div className="flex items-center justify-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add New Visit</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  if (currentView === 'calendar') return <CalendarView />;
  if (currentView === 'areaselection') return <AreaSelectionView />;
  if (currentView === 'mtplisting') return <MTPListingView />;
};

export default MTPPage;