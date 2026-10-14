import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SendScreen({ initialWhoOwes = 'they', onAddTransaction }: any) {
  const [step, setStep] = useState(1);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [whoOwes, setWhoOwes] = useState<'they' | 'i'>(initialWhoOwes);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    setWhoOwes(initialWhoOwes);
  }, [initialWhoOwes]);

  const friends = [
    { id: '1', initials: 'AR', name: 'Alex', handle: '@alexr', color: '#9B51E0', code: '#AR2934' },
    { id: '2', initials: 'JL', name: 'Jordan', handle: '@jlee', color: '#00C875', code: '#JL7823' },
    { id: '3', initials: 'SC', name: 'Sam', handle: '@samc', color: '#F5A623', code: '#SC1205' },
    { id: '4', initials: 'MW', name: 'Morgan', handle: '@mwu', color: '#FF4D4D', code: '#MW8834' },
    { id: '5', initials: 'CP', name: 'Casey', handle: '@caseyp', color: '#00A8FF', code: '#CP3304' },
  ];

  const handleNumpadPress = (val: string) => {
    if (val === 'back') {
      setAmount(prev => prev.slice(0, -1));
    } else {
      if (val === '.' && amount.includes('.')) return;
      if (amount.length < 7) {
        setAmount(prev => prev + val);
      }
    }
  };

  const selectedFriendObj = friends.find(f => f.id === selectedFriend);
  const isReady = selectedFriend !== null && amount.length > 0 && amount !== '.';
  
  const amountColor = whoOwes === 'they' ? '#00C875' : '#FF4D4D';
  const amountPrefix = whoOwes === 'they' ? '+' : '-';
  const helperText = selectedFriendObj ? (whoOwes === 'they' ? `${selectedFriendObj.name} owes you` : `You owe ${selectedFriendObj.name}`) : 'Select a friend';

  const displayAmount = amount ? amount : '0';

  // Format the new transaction and send it to the Brain
  const handleConfirmSend = () => {
    if (!selectedFriendObj) return;
    const isThey = whoOwes === 'they';
    const newTx = {
      id: Date.now().toString(),
      friendId: selectedFriendObj.id,
      initials: selectedFriendObj.initials,
      color: selectedFriendObj.color,
      name: selectedFriendObj.name,
      handle: selectedFriendObj.handle,
      code: selectedFriendObj.code,
      note: `"${note || 'Shared Expense'}"`,
      amount: `${isThey ? '+' : '-'}$${amount}`,
      status: isThey ? 'owes you' : 'you owe',
      isPositive: isThey,
      rawAmount: parseFloat(amount)
    };
    
    // Save to brain
    if (onAddTransaction) onAddTransaction(newTx);
    setStep(3);
  };

  if (step === 1) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>New Transaction</Text>
          <Text style={styles.subtitle}>Log a debt between you and a friend</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WITH</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsList}>
            {friends.map((friend) => {
              const isSelected = selectedFriend === friend.id;
              return (
                <TouchableOpacity key={friend.id} style={styles.friendItem} onPress={() => setSelectedFriend(friend.id)} activeOpacity={0.7}>
                  <View style={[styles.avatar, { backgroundColor: friend.color }, isSelected && { borderWidth: 3, borderColor: '#6b4eff' }]}>
                    <Text style={styles.avatarText}>{friend.initials}</Text>
                  </View>
                  <Text style={[styles.friendName, isSelected && { color: '#6b4eff', fontWeight: 'bold' }]}>{friend.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHO OWES?</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity style={[styles.toggleBtn, whoOwes === 'they' && { backgroundColor: '#00C875', borderColor: '#00C875' }]} onPress={() => setWhoOwes('they')} activeOpacity={0.8}>
              <Text style={[styles.toggleText, whoOwes === 'they' && { color: 'white' }]}>They owe me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleBtn, whoOwes === 'i' && { backgroundColor: '#FF4D4D', borderColor: '#FF4D4D' }]} onPress={() => setWhoOwes('i')} activeOpacity={0.8}>
              <Text style={[styles.toggleText, whoOwes === 'i' && { color: 'white' }]}>I owe them</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Text style={[styles.amountText, { color: amount ? amountColor : '#e0e0e0' }]}>{amount ? amountPrefix : ''}${displayAmount}</Text>
          <Text style={styles.helperText}>{helperText}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="What's this for? e.g. For bubble tea 🧋" placeholderTextColor="#b0b0b0" value={note} onChangeText={setNote} />
        </View>

        <View style={styles.numpad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'].map((key) => (
            <TouchableOpacity key={key} style={styles.numKey} onPress={() => handleNumpadPress(key)}>
              {key === 'back' ? <Ionicons name="backspace-outline" size={24} color="#333" /> : <Text style={styles.numText}>{key}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[styles.submitBtn, isReady && styles.submitBtnReady]} disabled={!isReady} onPress={() => setStep(2)}>
          <Text style={styles.submitBtnText}>{isReady ? `Continue · ${helperText} $${amount}` : 'Select a friend and amount'}</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  }

  if (step === 2 && selectedFriendObj) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Confirm Request</Text>
        </View>

        <View style={styles.confirmContent}>
          <View style={styles.confirmFriendCard}>
            <View style={[styles.avatarLarge, { backgroundColor: selectedFriendObj.color }]}>
              <Text style={styles.avatarTextLarge}>{selectedFriendObj.initials}</Text>
            </View>
            <View>
              <Text style={styles.confirmToText}>To</Text>
              <Text style={styles.confirmName}>{selectedFriendObj.name} Wu</Text>
              <Text style={styles.confirmHandle}>{selectedFriendObj.handle}</Text>
            </View>
          </View>

          <View style={styles.detailsBlock}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Amount</Text><Text style={styles.detailValue}>${amount}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Who owes</Text><Text style={styles.detailValue}>{helperText}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Message</Text><Text style={styles.detailValue}>"{note || 'No message'}"</Text></View>
            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}><Text style={styles.detailLabel}>Status after send</Text><Text style={styles.detailValue}>Pending their confirmation</Text></View>
          </View>

          <TouchableOpacity style={styles.sendBtn} onPress={handleConfirmSend}>
            <Text style={styles.sendBtnText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (step === 3 && selectedFriendObj) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.successIconBg}><Ionicons name="checkmark" size={40} color="#00C875" /></View>
          <Text style={styles.successTitle}>Request Sent!</Text>
          <Text style={styles.successSubtitle}>{selectedFriendObj.name} will be asked to confirm they owe you ${amount}</Text>
          {note ? <Text style={styles.successNote}>"{note}"</Text> : null}
          <View style={styles.pendingBadge}>
            <Ionicons name="time-outline" size={16} color="#F5A623" style={{ marginRight: 6 }} />
            <Text style={styles.pendingBadgeText}>Waiting for {selectedFriendObj.name}'s confirmation</Text>
          </View>
          <TouchableOpacity style={styles.newTransactionBtn} onPress={() => { setStep(1); setSelectedFriend(null); setAmount(''); setNote(''); }}>
            <Text style={styles.newTransactionText}>New Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#999' },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 12, color: '#999', fontWeight: 'bold', marginBottom: 12, letterSpacing: 0.5 },
  friendsList: { flexDirection: 'row', overflow: 'visible' },
  friendItem: { alignItems: 'center', marginRight: 16 },
  avatar: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  friendName: { fontSize: 13, color: '#666' },
  toggleContainer: { flexDirection: 'row', gap: 12 },
  toggleBtn: { flex: 1, backgroundColor: 'white', paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0' },
  toggleText: { fontSize: 14, fontWeight: 'bold', color: '#666' },
  amountContainer: { alignItems: 'center', paddingVertical: 10, marginBottom: 10 },
  amountText: { fontSize: 64, fontWeight: 'bold' },
  helperText: { fontSize: 14, color: '#999', marginTop: 4 },
  inputContainer: { paddingHorizontal: 20, marginBottom: 20 },
  textInput: { backgroundColor: 'white', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 16, padding: 16, fontSize: 15, color: '#333' },
  numpad: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'center' },
  numKey: { width: '30%', aspectRatio: 2.2, backgroundColor: 'white', margin: '1.5%', borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  numText: { fontSize: 24, fontWeight: '500', color: '#333' },
  submitBtn: { backgroundColor: '#cbbaf5', marginHorizontal: 20, marginTop: 15, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  submitBtnReady: { backgroundColor: '#6b4eff' },
  submitBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  bottomSpacer: { height: 120 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { color: '#6b4eff', fontSize: 16, fontWeight: '500' },
  confirmContent: { paddingHorizontal: 20 },
  confirmFriendCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  avatarLarge: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarTextLarge: { color: 'white', fontWeight: 'bold', fontSize: 22 },
  confirmToText: { fontSize: 12, color: '#999', marginBottom: 2 },
  confirmName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 2 },
  confirmHandle: { fontSize: 13, color: '#999' },
  detailsBlock: { backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 20, marginBottom: 30 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  detailLabel: { fontSize: 14, color: '#666' },
  detailValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  sendBtn: { backgroundColor: '#6b4eff', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  sendBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  successContainer: { flex: 1, backgroundColor: '#f8f9fc', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  successContent: { width: '100%', alignItems: 'center' },
  successIconBg: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#D4F5E1', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  successSubtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 8, paddingHorizontal: 20 },
  successNote: { fontSize: 15, color: '#999', fontStyle: 'italic', marginBottom: 24 },
  pendingBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  pendingBadgeText: { color: '#F5A623', fontSize: 13, fontWeight: '600' },
  newTransactionBtn: { width: '100%', backgroundColor: '#6b4eff', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  newTransactionText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});