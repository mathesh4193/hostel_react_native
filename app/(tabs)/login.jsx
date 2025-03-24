import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Login = () => {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setUserId('');
    setPassword('');
    setError('');
  };

  const validateForm = () => {
    setError('');

    if (role === 'Student') {
      const rollNoPattern = /^[0-9]{2}[A-Za-z]{4}[0-9]{2}$/i;
      if (!rollNoPattern.test(userId)) {
        setError('Roll number should be in format: 22CSEA44');
        return false;
      }
      setUserId(userId.toUpperCase());
    } else if (role === 'Warden') {
      const wardenPattern = /^WARDEN[0-9]{3}$/i;
      if (!wardenPattern.test(userId)) {
        setError('Warden ID should be in format: WARDEN123');
        return false;
      }
      setUserId(userId.toUpperCase());
    }

    const passwordPattern = /^[0-9]{12}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be exactly 12 digits');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const token = 'mock-token'; // Replace with actual API authentication
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role.toLowerCase());
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('userName', userId);

      console.log(`Login successful as ${role}: ${userId}`);
      Alert.alert('Success', 'Login Successful');

      router.push('/index');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    if (!role || !userId) {
      Alert.alert('Error', 'Please select a role and enter your ID to reset password');
      return;
    }
    Alert.alert('Password Reset', `Password reset link will be sent to registered email for ${role}: ${userId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Please select your role and enter your credentials</Text>

      <View style={styles.roleSelection}>
        {['Student', 'Warden'].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleButton, role === r && styles.selectedRole]}
            onPress={() => handleRoleSelection(r)}
          >
            <Text style={styles.roleText}>{r}</Text>
            <Text style={styles.roleSubtext}>
              Enter {r === 'Student' ? 'Roll Number' : 'Warden ID'} & Password
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {role ? (
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {role === 'Warden' ? 'Warden ID' : 'Roll Number'}
            </Text>
            <TextInput
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
              placeholder={`Enter ${role === 'Warden' ? 'Warden ID' : 'Roll Number'}`}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="#007BFF"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  roleSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  roleButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '45%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedRole: {
    backgroundColor: '#007BFF',
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  roleSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  errorText: {
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
  },
  signInButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default Login;
