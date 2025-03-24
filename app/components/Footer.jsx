import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';

const Footer = () => {
  const pathname = usePathname();
  
  // Hide footer on dashboard pages
  if (pathname.includes('dashboard')) return null;
  
  return (
    <View style={styles.footer}>
      <View style={styles.section}>
        <MaterialIcons name="school" size={24} color="#007BFF" />
        <Text style={styles.title}>VCET Hostel</Text>
        <Text style={styles.text}>
          Velammal College of Engineering and Technology - Madurai
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Quick Links</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://vcet.ac.in/vcetit/hostel.html')}>
          <Text style={styles.link}>VCET HOSTEL</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Contact Information</Text>
        <Text style={styles.text}>Velammal Nagar Viraganoor - Madurai 625009</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:principal@vcet.ac.in')}>
          <Text style={styles.link}>principal@vcet.ac.in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('tel:9994994991')}>
          <Text style={styles.link}>99949-94991</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.vcet.ac.in')}>
          <Text style={styles.link}>www.vcet.ac.in</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomSection}>
        <Text style={styles.copyright}>© 2025 VCET Hostel. All rights reserved.</Text>
        <Text style={styles.copyright}>Designed and Developed by MATHESH.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  link: {
    fontSize: 12,
    color: '#007BFF',
    marginBottom: 3,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 5,
  },
  copyright: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  }
});

export default Footer;