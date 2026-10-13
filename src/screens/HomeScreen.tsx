import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    backgroundColor: '#6b4eff',
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