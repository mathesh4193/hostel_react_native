import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, 
  SafeAreaView, Alert, Image 
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  const router = useRouter();

  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.logoContainer}>
        <Image 
          source={require("../assets/Vcet_logo.jpg")} 
          style={headerStyles.logo} 
        />
        <Text style={headerStyles.title}>VCET Hostel</Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <MaterialIcons name="login" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const Footer = () => {
  return (
    <View style={footerStyles.footer}>
      <Text style={footerStyles.text}>© 2025 VCET Hostel. All rights reserved.</Text>
      <Text style={footerStyles.text}>Designed and Developed by MATHESH</Text>
    </View>
  );
};

export default function Index() {
  const router = useRouter();

  const features = [
    { name: "About Us", screen: "about", icon: "info" },
    { name: "Leave Management", screen: "leave", icon: "event-note" },
    { name: "Complaints", screen: "complaints", icon: "warning" },
    { name: "Mess Menu", screen: "mess", icon: "restaurant" },
    { name: "Room Allocation", screen: "room", icon: "meeting-room" },
    { name: "Security", screen: "security", icon: "security" },
    { name: "Dashboard", screen: "dashboard", icon: "dashboard" },
    { name: "Out Pass", screen: "outpass", icon: "exit-to-app" },
    { name: "Attendance", screen: "attendance", icon: "check" },
  ];

  const handleNavigation = (feature) => {
    router.push(`/${feature.screen}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>VCET Hostel</Text>
        <Text style={styles.subtitle}>Managing Student Accommodation with Excellence</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.featureCard} 
              onPress={() => handleNavigation(feature)}
            >
              <MaterialIcons name={feature.icon} size={32} color="#007BFF" />
              <Text style={styles.featureTitle}>{feature.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

// Header styles
const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 15,
    paddingTop: 45,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

// Footer styles
const footerStyles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  text: {
    fontSize: 12,
    color: "#666",
  },
});

// Main component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },
  featureCard: {
    width: "45%",
    backgroundColor: "#fff",
    padding: 15,
    margin: 8,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
});
