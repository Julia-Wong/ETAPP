import { useEffect } from 'react';
import { supabase } from '../services/supabase';

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthScreen from '../screens/AuthScreen';
import FriendsScreen from '../screens/FriendsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SendScreen from '../screens/SendScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from('users')
        .select('name, email')
        .eq('id', userId)
        .single();
      if (data) setUser(data);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- GLOBAL STATE MEMORY ---
  const [hasPending, setHasPending] = useState(true);
  const [settledFriends, setSettledFriends] = useState<string[]>(['5']); // Casey is pre-settled initially so she doesn't hit the balance
  
  const [transactions, setTransactions] = useState([
    { id: 'tx1', friendId: '1', initials: 'AR', color: '#9B51E0', name: 'Alex Rivera', handle: '@alexr', code: '#AR2934', note: '"Dinner at Nobu 🍣"', amount: '+$25.50', status: 'owes you', isPositive: true, rawAmount: 25.50 },
    { id: 'tx2', friendId: '2', initials: 'JL', color: '#00C875', name: 'Jordan Lee', handle: '@jlee', code: '#JL7823', note: '"Lunch split 🍜"', amount: '-$45.50', status: 'you owe', isPositive: false, rawAmount: 45.50 },
    { id: 'tx3', friendId: '3', initials: 'SC', color: '#F5A623', name: 'Sam Chen', handle: '@samc', code: '#SC1205', note: '"Rent utilities ⚡"', amount: '+$120.00', status: 'owes you', isPositive: true, rawAmount: 120.00 },
    { id: 'tx4', friendId: '4', initials: 'MW', color: '#FF4D4D', name: 'Morgan Wu', handle: '@mwu', code: '#MW8834', note: '"Coffee run ☕"', amount: '-$18.75', status: 'you owe', isPositive: false, rawAmount: 18.75 },
    { id: 'tx5', friendId: '5', initials: 'CP', color: '#00A8FF', name: 'Casey Park', handle: '@caseyp', code: '#CP3304', note: '"Movie tickets 🎬"', amount: '+$22.00', status: 'owes you', isPositive: true, rawAmount: 22.00, hasBadge: true },
  ]);

  const [activeTab, setActiveTab] = useState('Home');
  const [sendParams, setSendParams] = useState<'they' | 'i'>('they');
  const [historyFriend, setHistoryFriend] = useState<any>(null);

  const [notifications, setNotifications] = useState([
    { id: '1', icon: 'checkmark-circle', iconColor: '#00C875', text: 'Alex Rivera accepted your $25.50 request', time: '2m ago', unread: true },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleAddTransaction = (newTx: any) => {
    setTransactions([newTx, ...transactions]);
    setSettledFriends(prev => prev.filter(id => id !== newTx.friendId));
  };

  const handleAcceptPending = () => {
    setHasPending(false);
    // Un-settle Casey (friendId 5) so her $22 gets added to the running balance!
    setSettledFriends(prev => prev.filter(id => id !== '5'));
  };

  const navigateToTab = (tab: string, params?: any) => {
    if (params?.whoOwes) setSendParams(params.whoOwes);
    if (params?.friend) setHistoryFriend(params.friend);
    else if (tab === 'History') setHistoryFriend(null); 
    setActiveTab(tab);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={(userData: any) => { setUser(userData); setIsAuthenticated(true); }} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreen onNavigate={navigateToTab} user={user} hasPending={hasPending} setHasPending={setHasPending} onAcceptPending={handleAcceptPending} transactions={transactions} settledFriends={settledFriends} unreadCount={unreadCount} />;
      case 'Notifications': return <NotificationsScreen onBack={() => setActiveTab('Home')} notifications={notifications} setNotifications={setNotifications} />;
      case 'History': return <HistoryScreen initialFriend={historyFriend} onBack={() => setHistoryFriend(null)} settledFriends={settledFriends} setSettledFriends={setSettledFriends} transactions={transactions} />;
      case 'Send': return <SendScreen initialWhoOwes={sendParams} onAddTransaction={handleAddTransaction} />;
      case 'Friends': return <FriendsScreen onNavigate={navigateToTab} />;
      case 'Profile': return <ProfileScreen onLogout={() => setIsAuthenticated(false)} user={user} />;
      default: return <HomeScreen onNavigate={navigateToTab} user={user} hasPending={hasPending} setHasPending={setHasPending} onAcceptPending={handleAcceptPending} transactions={transactions} settledFriends={settledFriends} unreadCount={unreadCount} />;
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