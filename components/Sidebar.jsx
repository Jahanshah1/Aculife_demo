// components/Sidebar.jsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, User, MapPin, Bell, Settings } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();

  const sidebarItems = [
    {
      id: 1,
      name: 'Profile',
      icon: User,
      description: 'View and edit your profile',
      onClick: () => {
        console.log('Navigate to Profile');
        onClose();
      }
    },
    {
      id: 2,
      name: 'Maps',
      icon: MapPin,
      description: 'Location and territory management',
      onClick: () => {
        router.push('/map');
        onClose();
      }
    },
    {
      id: 3,
      name: 'Notifications',
      icon: Bell,
      description: 'View all notifications',
      onClick: () => {
        console.log('Navigate to Notifications');
        onClose();
      }
    },
    {
      id: 4,
      name: 'Settings',
      icon: Settings,
      description: 'App preferences and configuration',
      onClick: () => {
        console.log('Navigate to Settings');
        onClose();
      }
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="bg-blue-600 dark:bg-blue-800 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">R</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Rahul Kumar</h3>
              <p className="text-blue-100 text-sm">Medical Representative</p>
            </div>
          </div>
        </div>

        {/* Sidebar Menu Items */}
        <div className="py-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Field Force Management v2.0
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              © 2024 Your Company
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;