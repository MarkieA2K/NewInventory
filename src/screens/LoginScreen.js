import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { state, dispatch, login } = useContext(AuthContext);
  const { username, password, loading, error, checked } = state; // Destructure state values
  const navigation = useNavigation();

  const handleUsernameChange = (text) => {
    dispatch({ type: 'SET_USERNAME', payload: text });
  };

  const handlePasswordChange = (text) => {
    dispatch({ type: 'SET_PASSWORD', payload: text });
  };

  const handleCheckboxPress = () => {
    dispatch({ type: 'SET_CHECKED', payload: !checked });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Username and password cannot be empty.',
      });
      return;
    }

    const success = await login(username, password, checked);
    if (success) {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.content}>
      <Image
        source={require('../../assets/A2K-LOGO.png')}
        style={styles.icon}
      />
      <LinearGradient
        colors={['#242A3E', '#191D2B', '#0F1016']}
        style={styles.formContainer}
      >
        <TextInput
          textColor='#EAEAEA'
          mode='flat'
          label='Username'
          value={username}
          onChangeText={handleUsernameChange}
          onFocus={() => dispatch({ type: 'SET_ERROR', payload: '' })}
          style={styles.input}
        />
        <TextInput
          textColor='#EAEAEA'
          label='Password'
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          style={styles.input}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#707070' }}>Remember Credentials? </Text>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={handleCheckboxPress}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          mode='contained'
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#242A3E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    borderWidth: 1,
    resizeMode: 'contain',
    width: 300,
    height: 270,
  },
  formContainer: {
    alignItems: 'center',
    width: '95%',
    padding: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 4,
    backgroundColor: '#FFF',
  },
  input: {
    marginVertical: 7,
    backgroundColor: 'rgba(255, 255, 255, .08)',
    width: '100%',
  },
  loginButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;
