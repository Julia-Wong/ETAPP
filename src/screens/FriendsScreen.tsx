import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function FriendsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Friends</Text>

      <View style={styles.friendCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.owesText}>Owes you $25.00</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 10 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 20 },
  friendCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6b4eff', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  owesText: { fontSize: 14, color: '#28a745', marginTop: 4 },
});