import OnboardingScreen from '@/screens/OnBoardingScreen';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <OnboardingScreen />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
