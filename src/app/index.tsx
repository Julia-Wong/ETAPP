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
  const [historyFriend, setHistoryFriend] = useState<any>(null);

  const [notifications, setNotifications] = useState([
    { id: '1', icon: 'checkmark-circle', iconColor: '#00C875', text: 'Alex Rivera accepted your $25.50 request', time: '2m ago', unread: true },
    { id: '2', icon: 'alarm-outline', iconColor: '#FF4D4D', text: 'Casey Park sent you a reminder to settle up', time: '1h ago', unread: true },
    { id: '3', icon: 'cash-outline', iconColor: '#999', text: 'Jordan Lee paid you $45.50', time: '3h ago', unread: false },
    { id: '4', icon: 'create-outline', iconColor: '#999', text: 'Sam Chen logged a new expense: Rent $120.00', time: 'yesterday', unread: false },
    { id: '5', icon: 'cafe-outline', iconColor: '#999', text: 'Morgan Wu confirmed your bubble tea request', time: '2 days ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const navigateToTab = (tab: string, params?: any) => {
    if (params?.whoOwes) setSendParams(params.whoOwes);
    
    // Catch the specific friend routing
    if (params?.friend) {
      setHistoryFriend(params.friend);
    } else if (tab === 'History') {
      setHistoryFriend(null); // Reset to main history list if just clicking the bottom tab
    }
    
    setActiveTab(tab);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreen onNavigate={navigateToTab} unreadCount={unreadCount} />;
      case 'Notifications': return <NotificationsScreen onBack={() => setActiveTab('Home')} notifications={notifications} setNotifications={setNotifications} />;
      // UPDATE THIS LINE BELOW:
      case 'History': return <HistoryScreen initialFriend={historyFriend} onBack={() => setHistoryFriend(null)} />;
      case 'Send': return <SendScreen initialWhoOwes={sendParams} />;
      case 'Friends': return <FriendsScreen onNavigate={navigateToTab} />;
      case 'Profile': return <ProfileScreen />;
      default: return <HomeScreen onNavigate={navigateToTab} unreadCount={unreadCount} />;
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
      {activeTab !== 'Notifications' && (
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab.name} style={styles.tabItem} onPress={() => navigateToTab(tab.name)} activeOpacity={0.7}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', paddingBottom: Platform.OS === 'ios' ? 20 : 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  regularTab: { alignItems: 'center' },
  tabText: { fontSize: 10, marginTop: 4, fontWeight: '500' },
  centerButton: { width: 56, height: 56, backgroundColor: '#6b4eff', borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginTop: -30, shadowColor: '#6b4eff', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 6 },
});