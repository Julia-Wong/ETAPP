import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryScreen() {
  const transactions = [
    { id: '1', initials: 'AR', color: '#9B51E0', name: 'Alex Rivera', note: '"Dinner at Nobu 🍣"', amount: '+$25.50', status: 'owes you', isPositive: true },
    { id: '2', initials: 'JL', color: '#00C875', name: 'Jordan Lee', note: '"Lunch split 🍲"', amount: '-$45.50', status: 'you owe', isPositive: false },
    { id: '3', initials: 'SC', color: '#F5A623', name: 'Sam Chen', note: '"Rent utilities ⚡"', amount: '+$120.00', status: 'owes you', isPositive: true },
    { id: '4', initials: 'MW', color: '#FF4D4D', name: 'Morgan Wu', note: '"Coffee run ☕"', amount: '-$18.75', status: 'you owe', isPositive: false },
    { id: '5', initials: 'CP', color: '#00A8FF', name: 'Casey Park', note: '"Movie tickets 🎬"', amount: null, status: 'Settled', isPositive: null, hasBadge: true },
  ];

  return (
    <ScrollView style={styles.container} bounces={true} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Tap a friend to see your history</Text>
      </View>

      {/* Transactions List */}
      <View style={styles.listContainer}>
        {transactions.map((tx) => (
          <TouchableOpacity key={tx.id} style={styles.card} activeOpacity={0.7}>
            
            {/* Avatar */}
            <View>
              <View style={[styles.avatar, { backgroundColor: tx.color }]}>
                <Text style={styles.avatarText}>{tx.initials}</Text>
              </View>
              {tx.hasBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>1</Text>
                </View>
              )}
            </View>

            {/* Middle Details */}
            <View style={styles.details}>
              <Text style={styles.name}>{tx.name}</Text>
              <Text style={styles.note}>{tx.note}</Text>
            </View>

            {/* Right Side Amounts */}
            <View style={styles.rightSection}>
              {tx.amount ? (
                <>
                  <Text style={[styles.amount, { color: tx.isPositive ? '#28a745' : '#dc3545' }]}>
                    {tx.amount}
                  </Text>
                  <Text style={styles.status}>{tx.status}</Text>
                </>
              ) : (
                <Text style={styles.settledText}>{tx.status}</Text>
              )}
            </View>

            {/* Chevron */}
            <Ionicons name="chevron-forward" size={16} color="#ccc" style={styles.chevron} />
          </TouchableOpacity>
        ))}
      </View>
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
    backgroundColor: '#ffffff',
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
  listContainer: {
    padding: 20,
    paddingBottom: 100, // Extra space for the bottom tab bar
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#F5A623',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  note: {
    fontSize: 13,
    color: '#999',
  },
  rightSection: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  amount: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: '#999',
  },
  settledText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888',
  },
  chevron: {
    marginLeft: 4,
  },
});