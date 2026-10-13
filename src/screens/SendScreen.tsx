import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SendScreen({ initialWhoOwes = 'they' }: any) {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [whoOwes, setWhoOwes] = useState<'they' | 'i'>(initialWhoOwes);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const friends = [
    { id: '1', initials: 'AR', name: 'Alex', color: '#9B51E0' },
    { id: '2', initials: 'JL', name: 'Jordan', color: '#00C875' },
    { id: '3', initials: 'SC', name: 'Sam', color: '#F5A623' },
    { id: '4', initials: 'MW', name: 'Morgan', color: '#FF4D4D' },
    { id: '5', initials: 'CP', name: 'Casey', color: '#00A8FF' },
  ];

  const handleNumpadPress = (val: string) => {
    if (val === 'back') {
      setAmount(prev => prev.slice(0, -1));
    } else {
      // Basic logic to prevent too many decimals or numbers
      if (val === '.' && amount.includes('.')) return;
      if (amount.length < 7) {
        setAmount(prev => prev + val);
      }
    }
  };

  const isReady = selectedFriend !== null && amount.length > 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>New Transaction</Text>
        <Text style={styles.subtitle}>Log a debt between you and a friend</Text>
      </View>

      {/* Friends Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>WITH</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsList}>
          {friends.map((friend) => {
            const isSelected = selectedFriend === friend.id;
            return (
              <TouchableOpacity 
                key={friend.id} 
                style={styles.friendItem}
                onPress={() => setSelectedFriend(friend.id)}
              >
                <View style={[
                  styles.avatar, 
                  { backgroundColor: friend.color },
                  isSelected && styles.avatarSelected
                ]}>
                  <Text style={styles.avatarText}>{friend.initials}</Text>
                </View>
                <Text style={[styles.friendName, isSelected && styles.friendNameSelected]}>
                  {friend.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Who Owes Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>WHO OWES?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleBtn, whoOwes === 'they' && styles.toggleBtnActive]}
            onPress={() => setWhoOwes('they')}
          >
            <Text style={[styles.toggleText, whoOwes === 'they' && styles.toggleTextActive]}>
              They owe me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, whoOwes === 'i' && styles.toggleBtnActive]}
            onPress={() => setWhoOwes('i')}
          >
            <Text style={[styles.toggleText, whoOwes === 'i' && styles.toggleTextActive]}>
              I owe them
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={[styles.amountSymbol, amount.length > 0 && styles.amountSymbolActive]}>$</Text>
        <Text style={[styles.amountText, amount.length > 0 && styles.amountTextActive]}>
          {amount || '0.00'}
        </Text>
      </View>

      {/* Note Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What's this for? e.g. For bubble tea 🧋"
          placeholderTextColor="#b0b0b0"
          value={note}
          onChangeText={setNote}
        />
      </View>

      {/* Numpad */}
      <View style={styles.numpad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'].map((key) => (
          <TouchableOpacity 
            key={key} 
            style={styles.numKey}
            onPress={() => handleNumpadPress(key)}
          >
            {key === 'back' ? (
              <Ionicons name="backspace-outline" size={24} color="#333" />
            ) : (
              <Text style={styles.numText}>{key}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        style={[styles.submitBtn, isReady && styles.submitBtnReady]}
        disabled={!isReady}
      >
        <Text style={styles.submitBtnText}>
          {isReady ? 'Confirm Transaction' : 'Select a friend and amount'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  friendsList: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  friendItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarSelected: {
    borderWidth: 3,
    borderColor: '#333',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  friendName: {
    fontSize: 12,
    color: '#666',
  },
  friendNameSelected: {
    color: '#333',
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleBtn: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  toggleBtnActive: {
    backgroundColor: '#50C878', // Emerald green
    borderColor: '#50C878',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  toggleTextActive: {
    color: 'white',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  amountSymbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginRight: 4,
  },
  amountSymbolActive: {
    color: '#333',
  },
  amountText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  amountTextActive: {
    color: '#333',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: '#333',
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  numKey: {
    width: '30%',
    aspectRatio: 2,
    backgroundColor: 'white',
    margin: '1.5%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  numText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
  },
  submitBtn: {
    backgroundColor: '#cbbaf5', // Inactive light purple
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitBtnReady: {
    backgroundColor: '#6b4eff', // Active deep purple
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 120, // Extra space for the floating button and tab bar
  },
});