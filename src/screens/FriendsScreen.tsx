import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../services/supabase';

export default function FriendsScreen({ onNavigate }: any) {
  const [myFriendCode, setMyFriendCode] = useState('');
  const handleCopyCode = async () => {
    if (!myFriendCode) {
      Alert.alert('Please wait', 'Your friend code is still loading.');
      return;
    }

    try {
      await Clipboard.setStringAsync(myFriendCode);
      Alert.alert('Copied!', `Copied ${myFriendCode}`);
    } catch (error) {
      console.log('Clipboard error:', error);
      Alert.alert('Error', 'Could not copy your friend code.');
    }
  };
  const [friendCodeError, setFriendCodeError] = useState('');

  useEffect(() => {
    let active = true;

    const loadFriendCode = async () => {
      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

      if (!active) return;

      if (authError || !user) {
        setFriendCodeError('Please sign in again.');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('friend_code')
        .eq('id', user.id)
        .single();

      if (!active) return;

      if (error || !data?.friend_code) {
        setFriendCodeError('Could not load friend code.');
        console.log('Friend code error:', error?.message);
        return;
      }

      setMyFriendCode(data.friend_code);
      setFriendCodeError('');
    };

    loadFriendCode();

    return () => {
      active = false;
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [addCode, setAddCode] = useState('');
  
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<string[]>([
    '8',
  ]);

  const [friends, setFriends] = useState([
    { id: '1', initials: 'AR', name: 'Alex Rivera', handle: '@alexr', code: '#AR2934', color: '#9B51E0', amount: '+$25.50', status: 'owes you', isPositive: true, rawAmount: 25.50, note: '"Dinner at Nobu 🍣"' },
    { id: '2', initials: 'JL', name: 'Jordan Lee', handle: '@jlee', code: '#JL7823', color: '#00C875', amount: '-$45.50', status: 'you owe', isPositive: false, rawAmount: 45.50, note: '"Lunch split 🍜"' },
    { id: '3', initials: 'SC', name: 'Sam Chen', handle: '@samc', code: '#SC1205', color: '#F5A623', amount: '+$120.00', status: 'owes you', isPositive: true, rawAmount: 120.00, note: '"Rent utilities ⚡"' },
    { id: '4', initials: 'MW', name: 'Morgan Wu', handle: '@mwu', code: '#MW8834', color: '#FF4D4D', amount: '-$18.75', status: 'you owe', isPositive: false, rawAmount: 18.75, note: '"Coffee run ☕"' },
    { id: '5', initials: 'CP', name: 'Casey Park', handle: '@caseyp', code: '#CP3304', color: '#00A8FF', amount: '+$22.00', status: 'owes you', isPositive: true, rawAmount: 22.00, note: '"Movie tickets 🎬"' },
  ]);
  
  // Demo users who can be added as friends
  const availableUsers = [
    {
      id: '6',
      initials: 'TS',
      name: 'Taylor Swift',
      handle: '@taylor',
      code: '#TS1234',
      color: '#9B51E0',
      amount: '$0.00',
      status: 'settled',
      isPositive: true,
      rawAmount: 0,
      note: 'No transactions yet',
    },
    {
      id: '7',
      initials: 'OC',
      name: 'Olivia Chen',
      handle: '@olivia',
      code: '#OC5678',
      color: '#00C875',
      amount: '$0.00',
      status: 'settled',
      isPositive: true,
      rawAmount: 0,
      note: 'No transactions yet',
    },
    {
      id: '8',
      initials: 'EW',
      name: 'Emma Wilson',
      handle: '@emma',
      code: '#EW9012',
      color: '#F5A623',
      amount: '$0.00',
      status: 'settled',
      isPositive: true,
      rawAmount: 0,
      note: 'No transactions yet',
    },
  ];
  
  
  // Check whether the entered friend code is valid
  const normalizedCode =
    '#' + addCode.trim().replace(/^#/, '').toUpperCase();

  const validFriend = availableUsers.find(
    (user) => user.code.toUpperCase() === normalizedCode
  );

  const alreadyAdded = friends.some(
    (friend) => friend.code.toUpperCase() === normalizedCode
  );

  // Only enable the button for a valid, new friend
  const alreadyRequested = validFriend
    ? sentRequests.includes(validFriend.id) ||
      receivedRequests.includes(validFriend.id)
    : false;

  const canAddFriend =
    !!validFriend && !alreadyAdded && !alreadyRequested;

  
const handleAddFriend = () => {
  if (!validFriend || !canAddFriend) return;

  setSentRequests((previous) => [
    ...previous,
    validFriend.id,
  ]);

  setAddCode('');

  Alert.alert(
    'Request Sent!',
    `Friend request sent to ${validFriend.name}.`
  );
};


const handleAcceptRequest = (userId: string) => {
  const user = availableUsers.find(
    (person) => person.id === userId
  );

  if (!user) return;

  setFriends((previous) =>
    previous.some((friend) => friend.id === userId)
      ? previous
      : [...previous, user]
  );

  setReceivedRequests((previous) =>
    previous.filter((id) => id !== userId)
  );

  Alert.alert('Friend Added!', `You and ${user.name} are now friends.`);
};

const handleDeclineRequest = (userId: string) => {
  setReceivedRequests((previous) =>
    previous.filter((id) => id !== userId)
  );
};

const handleCancelRequest = (userId: string) => {
  setSentRequests((previous) =>
    previous.filter((id) => id !== userId)
  );
};

// Demo only: simulate the other person accepting your request
const handleSimulateAcceptance = (userId: string) => {
  const user = availableUsers.find(
    (person) => person.id === userId
  );

  if (!user) return;

  setFriends((previous) =>
    previous.some((friend) => friend.id === userId)
      ? previous
      : [...previous, user]
  );

  setSentRequests((previous) =>
    previous.filter((id) => id !== userId)
  );

  Alert.alert(
    'Request Accepted!',
    `${user.name} accepted your friend request.`
  );
};


  // Filter friends based on what the user types
  const filteredFriends = friends.filter((friend) => {
    const search = searchQuery.trim().toLowerCase();

    return (
      friend.name.toLowerCase().includes(search) ||
      friend.handle.toLowerCase().includes(search) ||
      friend.code.toLowerCase().includes(search)
    );
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
        <Text style={styles.subtitle}>Find people & manage friends</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#b0b0b0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          placeholderTextColor="#b0b0b0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.codeCard}>
          <View style={styles.codeHeaderRow}>
            <View>
              <Text style={styles.codeLabel}>YOUR FRIEND CODE</Text>
              <Text style={styles.codeValue}>{friendCodeError || myFriendCode || 'Loading...'}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={handleCopyCode}
            >
              <Ionicons name="copy-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.codeFooter}>Share this code so friends can add you</Text>
        </View>

        <View style={styles.addSection}>
          <Text style={styles.sectionLabel}>ADD A FRIEND</Text>
          <View style={styles.addRow}>
            <TextInput
              style={styles.addInput}
              placeholder="Enter friend code e.g. #AR2934"
              placeholderTextColor="#b0b0b0"
              value={addCode}
              onChangeText={setAddCode}
            />
            <TouchableOpacity
              style={[
                styles.addBtn,
                { backgroundColor: canAddFriend ? '#6b4eff' : '#cbbaf5' }
              ]}
              onPress={handleAddFriend}
              disabled={!canAddFriend}
            >
              <Text style={styles.addBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

          
        {/* FRIEND REQUESTS */}
        <View style={styles.listSection}>
          <Text style={styles.sectionLabel}>
            FRIEND REQUESTS
          </Text>

          {/* Received Requests */}
          <Text style={{ fontWeight: '600', marginBottom: 10 }}>
            Received ({receivedRequests.length})
          </Text>

          {receivedRequests.map((userId) => {
            const user = availableUsers.find(
              (person) => person.id === userId
            );

            if (!user) return null;

            return (
              <View key={userId} style={styles.friendItem}>
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: user.color },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {user.initials}
                  </Text>
                </View>

                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>
                    {user.name}
                  </Text>
                  <Text style={styles.friendHandle}>
                    Wants to be friends
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleAcceptRequest(userId)}
                  style={{
                    backgroundColor: '#6b4eff',
                    padding: 9,
                    borderRadius: 8,
                    marginRight: 5,
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    Accept
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeclineRequest(userId)}
                  style={{ padding: 9 }}
                >
                  <Text style={{ color: '#999' }}>
                    Decline
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {/* Sent Requests */}
          <Text
            style={{
              fontWeight: '600',
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Sent ({sentRequests.length})
          </Text>

          {sentRequests.map((userId) => {
            const user = availableUsers.find(
              (person) => person.id === userId
            );

            if (!user) return null;

            return (
              <View key={userId} style={styles.friendItem}>
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: user.color },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {user.initials}
                  </Text>
                </View>

                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>
                    {user.name}
                  </Text>
                  <Text style={styles.friendHandle}>
                    Pending
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleSimulateAcceptance(userId)}
                  style={{
                    backgroundColor: '#6b4eff',
                    padding: 9,
                    borderRadius: 8,
                    marginRight: 5,
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    Demo Accept
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleCancelRequest(userId)}
                >
                  <Text style={{ color: '#999' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>


        <View style={styles.listSection}>
          <Text style={styles.sectionLabel}>YOUR FRIENDS</Text>
          <View style={styles.friendsList}>
            {filteredFriends.length === 0 && (
              <Text style={{
                textAlign: 'center',
                color: '#999',
                paddingVertical: 20,
                fontSize: 14,
              }}>
                No friends found
              </Text>
            )}
            {filteredFriends.map((friend) => (
              <View key={friend.id} style={styles.friendItem}>
                <View style={[styles.avatar, { backgroundColor: friend.color }]}>
                  <Text style={styles.avatarText}>{friend.initials}</Text>
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendHandle}>{friend.handle} · {friend.code}</Text>
                </View>

                {/* Updated View Button */}
                <TouchableOpacity 
                  style={styles.viewBtn} 
                  onPress={() => onNavigate('History', { friend: friend })}
                >
                  <Text style={styles.viewBtnText}>View</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#999' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f6f8', marginHorizontal: 20, paddingHorizontal: 15, borderRadius: 12, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#333' },
  content: { backgroundColor: '#f8f9fc', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 20, paddingTop: 24, minHeight: 600 },
  codeCard: { backgroundColor: '#6b4eff', borderRadius: 20, padding: 20, marginBottom: 24, shadowColor: '#6b4eff', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  codeHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  codeLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600', letterSpacing: 0.5, marginBottom: 4 },
  codeValue: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  copyBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  codeFooter: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  addSection: { marginBottom: 24 },
  sectionLabel: { fontSize: 12, color: '#999', fontWeight: 'bold', marginBottom: 12, letterSpacing: 0.5 },
  addRow: { flexDirection: 'row', gap: 10 },
  addInput: { flex: 1, backgroundColor: 'white', borderWidth: 1, borderColor: '#eee', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14 },
  addBtn: { backgroundColor: '#cbbaf5', borderRadius: 16, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  listSection: { flex: 1 },
  friendsList: { backgroundColor: 'white', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  friendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 2 },
  friendHandle: { fontSize: 12, color: '#999' },
  viewBtn: { backgroundColor: '#f0efff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  viewBtnText: { color: '#6b4eff', fontWeight: '600', fontSize: 14 },
  bottomSpacer: { height: 100, backgroundColor: '#f8f9fc' },
});