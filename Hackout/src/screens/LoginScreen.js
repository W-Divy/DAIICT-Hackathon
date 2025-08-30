import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../theme/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    // In a real app, you would implement proper authentication here
    if (email && password) {
      navigation.replace('Main');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <LinearGradient
      colors={[theme.colors.ocean, theme.colors.mangrove]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌿</Text>
            <Title style={styles.title}>Mangrove Monitor</Title>
            <Paragraph style={styles.subtitle}>
              Protect our coastal ecosystems together
            </Paragraph>
          </View>

          <Card style={styles.formCard}>
            <Card.Content>
              <Title style={styles.formTitle}>
                {isLogin ? 'Welcome Back' : 'Join the Mission'}
              </Title>
              
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>

              <Button
                mode="text"
                onPress={toggleMode}
                style={styles.toggleButton}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logo: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.surface,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: theme.spacing.sm,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.surface,
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default LoginScreen;
