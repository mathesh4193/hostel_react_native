import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import * as Location from 'expo-location';

// VCET Campus Coordinates
const VCET_COORDS = {
  latitude: 13.0159,
  longitude: 80.1791,
  radius: 0.5 // 500 meters in kilometers
};

export default function Attendance() {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isInCampus, setIsInCampus] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      try {
        const position = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const calculatedDistance = getDistance(
          latitude,
          longitude,
          VCET_COORDS.latitude,
          VCET_COORDS.longitude
        );

        setDistance(Math.round(calculatedDistance));
        setIsInCampus(calculatedDistance <= VCET_COORDS.radius);

        if (calculatedDistance > VCET_COORDS.radius) {
          setError(`You are ${Math.round(calculatedDistance)}m away from VCET.`);
        }

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        setAddress(data.display_name || 'Location not found');

      } catch (err) {
        setError('Failed to get location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const markAttendance = () => {
    if (!isInCampus) {
      Alert.alert('Attendance Status', `ABSENT\nYou are ${distance}m away from VCET.`);
      return;
    }
    Alert.alert('Attendance Status', 'PRESENT\nAttendance marked successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Status</Text>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <>
            {error && <Text style={styles.error}>{error}</Text>}

            {location && (
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>
                  Status:{' '}
                  <Text style={{ color: isInCampus ? '#4CAF50' : '#f44336' }}>
                    {isInCampus ? 'PRESENT ✅' : 'ABSENT ❌'}
                  </Text>
                </Text>
                <Text style={styles.locationText}>
                  Your Location: {address || 'Fetching address...'}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isInCampus ? '#4CAF50' : '#f44336' },
                (!location || !!error) && styles.buttonDisabled
              ]}
              onPress={markAttendance}
              disabled={!location || !!error}
            >
              <Text style={styles.buttonText}>
                Mark {isInCampus ? 'Present' : 'Absent'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  error: {
    color: '#f44336',
    marginBottom: 10,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});