import { Tabs, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  const handleProtectedRoute = async (routeName) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      router.push(`/${routeName}`);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#007BFF' },
        headerTintColor: '#fff',
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

      {/* Protected Routes */}
      {['leave', 'room', 'dashboard', 'outpass', 'attendance'].map((route) => (
        <Tabs.Screen
          key={route}
          name={route}
          options={{
            title: capitalize(route),
            tabBarIcon: ({ color }) => <MaterialIcons name={getIconName(route)} size={24} color={color} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleProtectedRoute(route);
            },
          }}
        />
      ))}

      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <MaterialIcons name="login" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

// Function to assign icons dynamically
const getIconName = (route) => {
  const icons = {
    leave: 'event-note',
    room: 'hotel',
    dashboard: 'dashboard',
    outpass: 'card-travel',
    attendance: 'how-to-reg',
  };
  return icons[route] || 'help';
};

// Function to capitalize the first letter of route names
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
