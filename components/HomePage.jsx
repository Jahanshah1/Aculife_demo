'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ToggleSwitch';
import Sidebar from './Sidebar';
import { Menu, FileText, Users, Calendar, Clock, FileSpreadsheet, BarChart3, MessageSquare, ExternalLink, Settings, HelpCircle, TrendingUp, Target, MapPin, Bell } from 'lucide-react';

const HomePage = () => {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const menuItems = [
    { 
      id: 1, 
      name: 'Customer', 
      icon: Users, 
      color: 'bg-blue-500 dark:bg-blue-600', 
      description: 'Manage doctors & hospitals',
      route: '/customer' 
    },
    { id: 2, name: 'File DCR', icon: FileText, color: 'bg-green-500 dark:bg-green-600', description: 'Daily call reports', route: '/filedcr' },
    { id: 3, name: 'MTP', icon: Calendar, color: 'bg-purple-500 dark:bg-purple-600', description: 'Monthly tour planning', route: '/mtp' },
    { id: 4, name: 'File Leave', icon: Clock, color: 'bg-orange-500 dark:bg-orange-600', description: 'Apply for leave' },
    { id: 5, name: 'DCR Listing', icon: FileSpreadsheet, color: 'bg-teal-500 dark:bg-teal-600', description: 'View DCR history' },
    { id: 6, name: 'Expense', icon: BarChart3, color: 'bg-indigo-500 dark:bg-indigo-600', description: 'Expense tracking' },
    { id: 7, name: 'Communication', icon: MessageSquare, color: 'bg-pink-500 dark:bg-pink-600', description: 'Team messages' },
    { id: 8, name: 'Quick Links', icon: ExternalLink, color: 'bg-cyan-500 dark:bg-cyan-600', description: 'Reports & campaigns' },
    { id: 9, name: 'Settings', icon: Settings, color: 'bg-gray-500 dark:bg-gray-600', description: 'App preferences' },
    { id: 10, name: 'Help', icon: HelpCircle, color: 'bg-blue-600 dark:bg-blue-700', description: 'Support & guidance' }
  ];

  const handleMenuClick = (item) => {
    if (item.route) {
      router.push(item.route);
    } else {
      console.log(`Navigating to ${item.name}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Fixed Header with safe area for mobile notches */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="safe-top px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <button 
                onClick={toggleSidebar}
                className="mr-2 sm:mr-3 p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors touch-manipulation"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold truncate">Home</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors touch-manipulation relative">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </button>
              <ThemeToggle 
                isDark={isDark} 
                toggleTheme={toggleTheme} 
                size="sm"
              />
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xs sm:text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with proper spacing for fixed header */}
      <div className="pt-16 sm:pt-20">
        <div className="px-3 py-4 sm:px-4 sm:py-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 text-white">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold mb-1">Welcome back, Rahul!</h2>
                <p className="text-xs sm:text-sm text-blue-100 mb-3">Ready to manage your field activities today</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs sm:text-sm">Online</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Dashboard */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">Today's Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">24</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Visits</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">89%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Target</div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">156</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Customers</div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">7</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Menu */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer border dark:border-gray-700 touch-manipulation"
                  onClick={() => handleMenuClick(item)}
                >
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm`}>
                      <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart Section */}
          <div className="mb-4 sm:mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">This Week's Performance</h3>
                <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">+12%</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Visits Completed</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">24/30</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Monthly Target</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">89/100</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">Recent Activity</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <div className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        DCR filed for Dr. Sharma
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago • Apollo Hospital</p>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Completed
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        New customer added to territory
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago • Dr. Patel Clinic</p>
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Added
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        MTP updated for next month
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday • 45 visits planned</p>
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      Updated
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        Expense report submitted
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago • ₹2,450 total</p>
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                      Pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips Section */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Today's Tip</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
                Remember to update your DCR within 2 hours of each visit for better accuracy and compliance.
              </p>
              <button className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Learn More
              </button>
            </div>
          </div>

          {/* Bottom spacing for mobile navigation */}
          <div className="pb-4 sm:pb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;