import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#1F5D2B', // Changed to Green to match your active bg logic
        tabBarInactiveTintColor: '#7A9E8C',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        // Remove tabBarItemStyle justifyContent: 'center' as it disrupts internal alignment
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialIcons name="home" size={24} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: 'CATEGORIES',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialIcons name="list" size={24} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialIcons name="person" size={24} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 85, // Increased height to accommodate the padding/highlight
    borderRadius: 20,
    backgroundColor: '#F6F7FB',
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingBottom: 10, // Centers the content vertically
    paddingTop: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  activeIcon: {
    backgroundColor: '#1F5D2B',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 8,
  },
});