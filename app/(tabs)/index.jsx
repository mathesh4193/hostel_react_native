import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter(); // Use router for navigation

  const features = [
    { name: 'About Us', screen: 'about', description: 'Learn more about our hostel', icon: 'info' },
    { name: 'Leave Management', screen: 'leave', description: 'Easy leave application process', icon: 'event-note' },
    { name: 'Complaints', screen: 'complaints', description: 'Submit and track complaints', icon: 'warning' },
    { name: 'Mess Menu', screen: 'mess', description: 'View daily menu', icon: 'restaurant' },
    { name: 'Room Allocation', screen: 'room', description: 'Room details and requests', icon: 'meeting-room' },
    { name: 'Security', screen: 'security', description: 'Campus security information', icon: 'security' },
    { name: 'Dashboard', screen: 'dashboard', description: 'Access your dashboard', icon: 'dashboard' },
    { name: 'Out Pass', screen: 'outpass', description: 'Request out pass', icon: 'exit-to-app' },
    { name: 'Attendance', screen: 'attendance', description: 'Track daily attendance', icon: 'check' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to VCET Hostel</Text>
        <Text style={styles.subtitle}>Managing Student Accommodation with Excellence</Text>
      </View>
      <ScrollView contentContainerStyle={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => router.push(feature.screen)}
          >
            <MaterialIcons name={feature.icon} size={24} color="#007BFF" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.featureTitle}>{feature.name}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
});

// Remove this line to fix the duplicate export error