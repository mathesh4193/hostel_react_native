import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const About = () => {
  const router = useRouter();

  const wardens = [
    { name: 'Dr. P. Alli, Principal', designation: 'Chief Warden', contact: '+919443566537', icon: 'person' },
    { name: 'Dr. S. Gopalakrishnan', designation: "Warden/Men's Hostel", contact: '+917373018067', icon: 'supervisor-account' },
    { name: 'Mrs. A. Maheswari', designation: "Warden/Ladies Hostel", contact: '+919150343292', icon: 'supervisor-account' },
    { name: 'Mr. P. Radhakrishnan', designation: "Deputy Warden / Men's Hostel", contact: '+919363338971', icon: 'person' },
    { name: 'Mr. R. Thavamani', designation: "Deputy Warden / Men's Hostel", contact: '+919566513579', icon: 'person' },
    { name: 'Ms. N. Alima Banu', designation: "Deputy Warden / Women's Hostel", contact: '+919944566610', icon: 'person' },
  ];

  const amenities = [
    { text: "Modern accommodation with Wi-Fi", icon: 'wifi' },
    { text: "24/7 Security", icon: 'security' },
    { text: "Hygienic dining facilities", icon: 'restaurant' },
    { text: "Recreation areas", icon: 'sports-esports' },
    { text: "Study rooms", icon: 'school' },
    { text: "Medical facilities", icon: 'local-hospital' }
  ];

  const sections = [
    {
      id: 'header',
      type: 'header',
    },
    {
      id: 'vision',
      type: 'vision'
    },
    {
      id: 'wardens',
      type: 'wardens',
      data: wardens
    },
    {
      id: 'amenities',
      type: 'amenities',
      data: amenities
    }
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.headerSection}>
            <Text style={styles.title}>About VCET Hostel Connect</Text>
          </View>
        );
      case 'vision':
        return (
          <View style={styles.section}>
            <Text style={styles.heading}>Our Vision & Mission</Text>
            <Text style={styles.subHeading}>Vision</Text>
            <Text style={styles.paragraph}>
              To revolutionize academic administration through innovative digital solutions that enhance the educational experience.
            </Text>
            <Text style={styles.subHeading}>Mission</Text>
            <Text style={styles.paragraph}>
              Creating seamless connections between students, faculty, and administration while maintaining transparency and efficiency.
            </Text>
          </View>
        );
      case 'wardens':
        return (
          <View style={styles.section}>
            <Text style={styles.heading}>Hostel Administration</Text>
            <FlatList
              data={item.data}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.wardenCard} onPress={() => Linking.openURL(`tel:${item.contact}`)}>
                  <MaterialIcons name={item.icon} size={24} color="#007BFF" />
                  <View style={styles.wardenInfo}>
                    <Text style={styles.wardenName}>{item.name}</Text>
                    <Text style={styles.wardenDesignation}>{item.designation}</Text>
                    <Text style={styles.phoneLink}>{item.contact}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      case 'amenities':
        return (
          <View style={styles.section}>
            <Text style={styles.heading}>Modern Amenities</Text>
            <FlatList
              data={item.data}
              renderItem={({ item }) => (
                <View style={styles.amenityItem}>
                  <MaterialIcons name={item.icon} size={24} color="#007BFF" />
                  <Text style={styles.amenityText}>{item.text}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      case 'footer':
        return (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              A proud initiative developed by Mathesh, Department of Computer Science and Engineering.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={sections}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerSection: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  wardenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  wardenInfo: {
    marginLeft: 15,
    flex: 1,
  },
  wardenName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  wardenDesignation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  phoneLink: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 2,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#444',
  }
});

export default About;
