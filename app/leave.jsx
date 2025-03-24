import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, FlatList } from "react-native";
import { Text, RadioButton, Button, TextInput, Snackbar, Card, Chip, Divider, SegmentedButtons, Modal } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export default function Leave() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check login status when component mounts
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      router.replace('/login');
      return;
    }
    setIsLoggedIn(true);
  };

  const [leaveData, setLeaveData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    leaveType: "",
    halfDayOption: "",
    reason: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Open calendar modal
  const openCalendar = (type) => {
    setCalendarType(type);
    // Make sure we have a valid date object
    if (leaveData[type] && leaveData[type] instanceof Date) {
      setSelectedMonth(leaveData[type].getMonth());
      setSelectedYear(leaveData[type].getFullYear());
    } else {
      // Use current date as fallback
      const today = new Date();
      setSelectedMonth(today.getMonth());
      setSelectedYear(today.getFullYear());
      // Update the leave data with today's date
      setLeaveData(prev => ({
        ...prev,
        [type]: today
      }));
    }
    setShowCalendar(true);
  };

  // Handle date selection
  const selectDate = (day) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    setLeaveData(prev => ({
      ...prev,
      [calendarType]: newDate
    }));
    setShowCalendar(false);
  };

  // Navigate to previous month
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Generate days for the calendar
  const generateCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    
    const days = [];
    // Add empty spaces for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleSubmit = () => {
    const { startDate, endDate, leaveType, halfDayOption, reason } = leaveData;
  
    if (!leaveType) {
      setSnackbarMessage("Please select a leave type.");
      setSnackbarVisible(true);
      return;
    }
  
    if (leaveType === "singleDay" && !halfDayOption) {
      setSnackbarMessage("Please select a half-day option.");
      setSnackbarVisible(true);
      return;
    }
  
    if (!reason.trim()) {
      setSnackbarMessage("Please provide a reason for leave.");
      setSnackbarVisible(true);
      return;
    }
  
    if (endDate < startDate) {
      setSnackbarMessage("End date cannot be before start date.");
      setSnackbarVisible(true);
      return;
    }
  
    // Email information - updated with the new email
    const emailTo = "mathesh8940@gmail.com";
    const leaveTypeText = leaveType === "singleDay" ? 
      `Single Day Leave (${halfDayOption === "forenoon" ? "Forenoon" : "Afternoon"})` : 
      "Medical Leave";
    
    // In a real app, you would send this data to your backend
    Alert.alert(
      "Leave Request Submitted", 
      `Your leave request has been sent to ${emailTo}.\n\nLeave Details:\n- Type: ${leaveTypeText}\n- From: ${startDate.toDateString()}\n- To: ${endDate.toDateString()}\n- Reason: ${reason}`,
      [{ text: "OK" }]
    );
  };

  // Don't render anything while checking login status
  if (!isLoggedIn) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <MaterialIcons name="event-note" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Leave Management</Text>
      </View>
      
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Leave Request Form</Text>

        {/* Start Date Button */}
        <Button 
          mode="outlined" 
          onPress={() => openCalendar('startDate')}
          style={styles.dateButton}
          icon="calendar"
        >
          Start Date: {leaveData.startDate.toDateString()}
        </Button>

        {/* End Date Button */}
        <Button 
          mode="outlined" 
          onPress={() => openCalendar('endDate')}
          style={styles.dateButton}
          icon="calendar"
        >
          End Date: {leaveData.endDate.toDateString()}
        </Button>

        {/* Leave Type Selection */}
        <Text style={styles.label}>Leave Type</Text>
        <RadioButton.Group
          onValueChange={(value) => setLeaveData({ ...leaveData, leaveType: value })}
          value={leaveData.leaveType}
        >
          <View style={styles.radioOption}>
            <RadioButton value="singleDay" />
            <Text>Single Day Leave</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="medical" />
            <Text>Medical Leave</Text>
          </View>
        </RadioButton.Group>

        {/* Half Day Option (Visible Only for Single Day Leave) */}
        {leaveData.leaveType === "singleDay" && (
          <>
            <Text style={styles.label}>Half Day Option</Text>
            <RadioButton.Group
              onValueChange={(value) => setLeaveData({ ...leaveData, halfDayOption: value })}
              value={leaveData.halfDayOption}
            >
              <View style={styles.radioOption}>
                <RadioButton value="forenoon" />
                <Text>Forenoon</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="afternoon" />
                <Text>Afternoon</Text>
              </View>
            </RadioButton.Group>
          </>
        )}

        {/* Reason Input */}
        <TextInput
          label="Reason for Leave"
          value={leaveData.reason}
          onChangeText={(text) => setLeaveData({ ...leaveData, reason: text })}
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        {/* Submit Button */}
        <Button 
          mode="contained" 
          onPress={handleSubmit} 
          style={styles.submitButton}
          color="#007BFF"
        >
          Request Leave
        </Button>
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        onDismiss={() => setShowCalendar(false)}
        contentContainerStyle={styles.calendarModal}
      >
        <View style={styles.calendarHeader}>
          <Button onPress={prevMonth} icon="chevron-left" mode="text" />
          <Text style={styles.calendarTitle}>
            {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} {selectedYear}
          </Text>
          <Button onPress={nextMonth} icon="chevron-right" mode="text" />
        </View>
        
        <View style={styles.weekDays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <Text key={index} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.calendarDays}>
          {generateCalendarDays().map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                day === null ? styles.emptyDay : null,
                day === leaveData[calendarType]?.getDate() && 
                selectedMonth === leaveData[calendarType]?.getMonth() && 
                selectedYear === leaveData[calendarType]?.getFullYear() ? styles.selectedDay : null
              ]}
              onPress={() => day !== null && selectDate(day)}
              disabled={day === null}
            >
              {day !== null && <Text style={styles.dayText}>{day}</Text>}
            </TouchableOpacity>
          ))}
        </View>
        
        <Button onPress={() => setShowCalendar(false)} style={styles.closeButton}>
          Cancel
        </Button>
      </Modal>

      {/* Snackbar for Messages */}
      <Snackbar 
        visible={snackbarVisible} 
        onDismiss={() => setSnackbarVisible(false)} 
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
    paddingTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: '#444',
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  input: {
    marginTop: 15,
    backgroundColor: "white",
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 8,
  },
  dateButton: {
    marginVertical: 10,
    borderColor: '#007BFF',
  },
  calendarModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calendarDay: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
  }
});