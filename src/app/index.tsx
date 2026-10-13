import FriendsScreen from '../screens/FriendsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SendScreen from '../screens/SendScreen';

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />; 
      case 'History':
        return <HistoryScreen />;
      case 'Send':
        return <SendScreen />;
      case 'Friends':
        return <FriendsScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'History', icon: 'time-outline' },
    { name: 'Send', icon: 'swap-vertical', isCenter: true },
    { name: 'Friends', icon: 'people-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.name)}
            activeOpacity={0.7}
          >
            {tab.isCenter ? (
              <View style={styles.centerButton}>
                <Ionicons name={tab.icon as any} size={28} color="white" />
              </View>
            ) : (
              <View style={styles.regularTab}>
                <Ionicons
                  name={tab.icon as any}
                  size={24}
                  color={activeTab === tab.name ? '#6b4eff' : '#999'}
                />
                <Text style={[styles.tabText, { color: activeTab === tab.name ? '#6b4eff' : '#999' }]}>
                  {tab.name}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  screen: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 40 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regularTab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  centerButton: {
    width: 56,
    height: 56,
    backgroundColor: '#6b4eff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    shadowColor: '#6b4eff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
});