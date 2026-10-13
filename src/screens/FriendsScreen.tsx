import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FriendsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addCode, setAddCode] = useState('');

  const friends = [
    { id: '1', initials: 'AR', name: 'Alex Rivera', handle: '@alexr', code: '#AR2934', color: '#9B51E0' },
    { id: '2', initials: 'JL', name: 'Jordan Lee', handle: '@jlee', code: '#JL7823', color: '#00C875' },
    { id: '3', initials: 'SC', name: 'Sam Chen', handle: '@samc', code: '#SC1205', color: '#F5A623' },
    { id: '4', initials: 'MW', name: 'Morgan Wu', handle: '@mwu', code: '#MW8834', color: '#FF4D4D' },
    { id: '5', initials: 'CP', name: 'Casey Park', handle: '@caseyp', code: '#CP3304', color: '#00A8FF' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
        <Text style={styles.subtitle}>Find people & manage friends</Text>
      </View>

      {/* Search Bar */}
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

      {/* Main White Content Area */}
      <View style={styles.content}>
        
        {/* Friend Code Card */}
        <View style={styles.codeCard}>
          <View style={styles.codeHeaderRow}>
            <View>
              <Text style={styles.codeLabel}>YOUR FRIEND CODE</Text>
              <Text style={styles.codeValue}>#JD4821</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn}>
              <Ionicons name="copy-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.codeFooter}>Share this code so friends can add you</Text>
        </View>

        {/* Add Friend Section */}
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
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Friends List */}
        <View style={styles.listSection}>
          <Text style={styles.sectionLabel}>YOUR FRIENDS</Text>
          
          <View style={styles.friendsList}>
            {friends.map((friend) => (
              <View key={friend.id} style={styles.friendItem}>
                <View style={[styles.avatar, { backgroundColor: friend.color }]}>
                  <Text style={styles.avatarText}>{friend.initials}</Text>
                </View>
                
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendHandle}>
                    {friend.handle} · {friend.code}
                  </Text>
                </View>

                <TouchableOpacity style={styles.payBtn}>
                  <Text style={styles.payBtnText}>Pay</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6f8',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  content: {
    backgroundColor: '#f8f9fc',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
    minHeight: 600,
  },
  codeCard: {
    backgroundColor: '#6b4eff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#6b4eff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  codeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  codeLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  codeValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  copyBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeFooter: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  addSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  addRow: {
    flexDirection: 'row',
    gap: 10,
  },
  addInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#cbbaf5',
    borderRadius: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listSection: {
    flex: 1,
  },
  friendsList: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  friendHandle: {
    fontSize: 12,
    color: '#999',
  },
  payBtn: {
    backgroundColor: '#f0efff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  payBtnText: {
    color: '#6b4eff',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomSpacer: {
    height: 100, // Extra space for the bottom tab bar
    backgroundColor: '#f8f9fc',
  },
});