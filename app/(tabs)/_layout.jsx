import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabsLayout() {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedRole = await AsyncStorage.getItem('role');
    const token = await AsyncStorage.getItem('token');
    setRole(storedRole);
    setIsLoggedIn(!!token);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <MaterialIcons name="info" size={24} color={color} />,
        }}
      />

      {isLoggedIn && (
        <Tabs.Screen
          name="attendance"
          options={{
            title: 'Attendance',
            tabBarIcon: ({ color }) => <MaterialIcons name="check" size={24} color={color} />,
          }}
        />
      )}

      {isLoggedIn && role === 'student' && (
        <Tabs.Screen
          name="outpass"
          options={{
            title: 'Outpass',
            tabBarIcon: ({ color }) => <MaterialIcons name="exit-to-app" size={24} color={color} />,
          }}
        />
      )}

      {!isLoggedIn && (
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <MaterialIcons name="login" size={24} color={color} />,
          }}
        />
      )}
    </Tabs>
  );
}