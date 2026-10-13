import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.header}>Transaction History</Text>
      
      <View style={styles.monthSection}>
        <Text style={styles.monthText}>October</Text>
        
        <View style={styles.item}>
          <Ionicons name="restaurant-outline" size={24} color="#6b4eff" style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.title}>Dinner at Joe's</Text>
            <Text style={styles.date}>Oct 12</Text>
          </View>
          <Text style={styles.amountPositive}>+$25.00</Text>
        </View>

        <View style={styles.item}>
          <Ionicons name="cart-outline" size={24} color="#6b4eff" style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.title}>Groceries</Text>
            <Text style={styles.date}>Oct 10</Text>
          </View>
          <Text style={styles.amountNegative}>-$45.50</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 10 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 20 },
  monthSection: { marginBottom: 20 },
  monthText: { fontSize: 16, fontWeight: 'bold', color: '#666', marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 10 },
  icon: { marginRight: 15 },
  details: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 12, color: '#999', marginTop: 4 },
  amountPositive: { fontSize: 16, fontWeight: 'bold', color: '#28a745' },
  amountNegative: { fontSize: 16, fontWeight: 'bold', color: '#dc3545' },
});