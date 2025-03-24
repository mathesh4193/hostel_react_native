import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Linking } from 'react-native';

const Complaints = () => {
  const [complaint, setComplaint] = useState({
    subject: '',
    description: ''
  });

  const handleSubmit = async () => {
    if (!complaint.subject || !complaint.description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const emailBody = `
Subject: ${complaint.subject}
Description: ${complaint.description}
Timestamp: ${new Date().toLocaleString()}
From: VCET Hostel Student
      `;

      const mailtoUrl = `mailto:mathinash58@gmail.com?subject=${encodeURIComponent(complaint.subject)}&body=${encodeURIComponent(emailBody)}`;
      
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
        setComplaint({ subject: '', description: '' });
        Alert.alert('Success', 'Email client opened successfully!');
      } else {
        Alert.alert('Error', 'No email client found');
      }
    } catch (error) {
      console.error('Email Error:', error);
      Alert.alert('Error', 'Failed to open email client');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Submit a Complaint</Text>
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter subject"
              placeholderTextColor="#666"
              value={complaint.subject}
              onChangeText={(text) => setComplaint({...complaint, subject: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={complaint.description}
              onChangeText={(text) => setComplaint({...complaint, description: text})}
            />
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Complaint</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Complaints;