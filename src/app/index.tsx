import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FriendsScreen from '../screens/FriendsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SendScreen from '../screens/SendScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [sendParams, setSendParams] = useState<'they' | 'i'>('they');

  // This custom navigation function passes variables to screens
  const navigateToTab = (tab: string, params?: any) => {
    if (params?.whoOwes) setSendParams(params.whoOwes);
    setActiveTab(tab);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreen onNavigate={navigateToTab} />;
      case 'Notifications': return <NotificationsScreen onBack={() => setActiveTab('Home')} />;
      case 'History': return <HistoryScreen />;
      case 'Send': return <SendScreen initialWhoOwes={sendParams} />;
      case 'Friends': return <FriendsScreen />;
      case 'Profile': return <ProfileScreen />;
      default: return <HomeScreen onNavigate={navigateToTab} />;
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
      <View style={styles.content}>{renderScreen()}</View>

      {/* Hide bottom tabs if on Notifications screen */}
      {activeTab !== 'Notifications' && (
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab.name} style={styles.tabItem} onPress={() => setActiveTab(tab.name)} activeOpacity={0.7}>
              {tab.isCenter ? (
                <View style={styles.centerButton}><Ionicons name={tab.icon as any} size={28} color="white" /></View>
              ) : (
                <View style={styles.regularTab}>
                  <Ionicons name={tab.icon as any} size={24} color={activeTab === tab.name ? '#6b4eff' : '#999'} />
                  <Text style={[styles.tabText, { color: activeTab === tab.name ? '#6b4eff' : '#999' }]}>{tab.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

// ... Keep your exact same styles from index.tsx here (container, tabBar, centerButton, etc) ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', paddingBottom: Platform.OS === 'ios' ? 20 : 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  regularTab: { alignItems: 'center' },
  tabText: { fontSize: 10, marginTop: 4, fontWeight: '500' },
  centerButton: { width: 56, height: 56, backgroundColor: '#6b4eff', borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginTop: -30, shadowColor: '#6b4eff', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 6 },
});