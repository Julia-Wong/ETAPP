import { Ionicons } from '@expo/vector-icons'; // Expo's built-in icon library
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  // This state keeps track of which tab you are currently on
  const [activeTab, setActiveTab] = useState('Home');

  // This function changes the screen text based on the active tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <View style={styles.screen}>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.name}>Jamie 👋</Text>
            
            <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>NET BALANCE</Text>
              <Text style={styles.balanceAmount}>+$81.25</Text>
              <Text style={styles.balanceSubtitle}>You are owed $120.00</Text>
            </View>

            <Text style={styles.sectionTitle}>Recent Activity</Text>
            
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Ionicons name="pizza-outline" size={20} color="#6b4eff" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionText}>Pizza with Alex</Text>
                <Text style={styles.transactionDate}>Today, 8:30 PM</Text>
              </View>
              <Text style={[styles.transactionAmount, {color: '#28a745'}]}>+$12.50</Text>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Ionicons name="car-outline" size={20} color="#6b4eff" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionText}>Uber to concert</Text>
                <Text style={styles.transactionDate}>Yesterday</Text>
              </View>
              <Text style={[styles.transactionAmount, {color: '#dc3545'}]}>-$24.00</Text>
            </View>
          </View>
        );
    }
  };

  // Our 5 tabs and their icons
  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'History', icon: 'time-outline' },
    { name: 'Send', icon: 'swap-vertical', isCenter: true }, // The purple middle button
    { name: 'Friends', icon: 'people-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content Area */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.name)}
            activeOpacity={0.7}
          >
            {tab.isCenter ? (
              // The special floating center button
              <View style={styles.centerButton}>
                <Ionicons name={tab.icon as any} size={28} color="white" />
              </View>
            ) : (
              // Regular tabs
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
    backgroundColor: '#f8f9fc', // Light gray background
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
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#6b4eff', // Your Figma purple
    borderRadius: 20,
    padding: 24,
    shadowColor: '#6b4eff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  balanceTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
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
    marginTop: -30, // Pushes it up to make it "float"
    shadowColor: '#6b4eff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  balanceSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(107, 78, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});