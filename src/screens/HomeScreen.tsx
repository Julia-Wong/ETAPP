import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      {/* Top Purple Section */}
      <View style={styles.headerBackground}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.name}>Jamie 👋</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>NET BALANCE</Text>
          <Text style={styles.balanceAmount}>+$81.25</Text>
          
          <View style={styles.splitBalances}>
            <View style={styles.splitBox}>
              <Text style={styles.splitLabel}>You are owed</Text>
              <Text style={styles.owedAmount}>$145.50</Text>
            </View>
            <View style={styles.splitBox}>
              <Text style={styles.splitLabel}>You owe</Text>
              <Text style={styles.oweAmount}>$64.25</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main White Content Area */}
      <View style={styles.mainContent}>
        {/* Quick Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#F0EFFF' }]}>
              <Ionicons name="trending-up" size={24} color="#6b4eff" />
            </View>
            <Text style={styles.actionText}>Log Debt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#EFFFF4' }]}>
              <Ionicons name="trending-down" size={24} color="#28a745" />
            </View>
            <Text style={styles.actionText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#FFF6E5' }]}>
              <Ionicons name="time-outline" size={24} color="#F5A623" />
            </View>
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#FFEBEB' }]}>
              <Ionicons name="compass-outline" size={24} color="#dc3545" />
            </View>
            <Text style={styles.actionText}>Friends</Text>
          </TouchableOpacity>
        </View>

        {/* Needs Response Section */}
        <Text style={styles.sectionTitle}>Needs your response</Text>
        <View style={styles.responseCard}>
          <View style={[styles.avatar, { backgroundColor: '#00A8FF' }]}>
            <Text style={styles.avatarText}>CP</Text>
          </View>
          <View style={styles.responseDetails}>
            <Text style={styles.responseMainText}>
              <Text style={styles.boldText}>Casey </Text>says they owe you
            </Text>
            <Text style={styles.responseAmount}>$22.00</Text>
            <Text style={styles.responseNote}>"Movie tickets 🎬"</Text>
          </View>
          <View style={styles.responseActions}>
            <TouchableOpacity style={styles.rejectBtn}>
              <Ionicons name="close" size={20} color="#dc3545" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn}>
              <Ionicons name="checkmark" size={20} color="#28a745" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Friends Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.friendList}>
          <View style={styles.friendItem}>
            <View style={[styles.avatar, { backgroundColor: '#9B51E0' }]}>
              <Text style={styles.avatarText}>AR</Text>
            </View>
            <Text style={styles.friendName}>Alex Rivera</Text>
            <Text style={styles.amountPositive}>+$25.50</Text>
          </View>
          
          <View style={styles.friendItem}>
            <View style={[styles.avatar, { backgroundColor: '#00C875' }]}>
              <Text style={styles.avatarText}>JL</Text>
            </View>
            <Text style={styles.friendName}>Jordan Lee</Text>
            <Text style={styles.amountNegative}>-$45.50</Text>
          </View>

          <View style={styles.friendItem}>
            <View style={[styles.avatar, { backgroundColor: '#F5A623' }]}>
              <Text style={styles.avatarText}>SC</Text>
            </View>
            <Text style={styles.friendName}>Sam Chen</Text>
            <Text style={styles.amountPositive}>+$120.00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b4eff', // Base purple to support top area[cite: 4]
  },
  headerBackground: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#6b4eff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  name: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    backgroundColor: '#ff4d4d',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6b4eff',
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 24,
  },
  balanceTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 20,
  },
  splitBalances: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  splitBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 16,
  },
  splitLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  owedAmount: {
    color: '#00E676',
    fontSize: 18,
    fontWeight: 'bold',
  },
  oweAmount: {
    color: '#FF7A7A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100, // Extra padding for the bottom tab bar
    marginTop: -20, // Overlap the purple background slightly[cite: 4]
    minHeight: 600,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    marginBottom: 30,
    elevation: 3,
    marginTop: -60, // Pull up over the white curve[cite: 4]
  },
  actionItem: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconBg: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#6b4eff',
    fontSize: 14,
    fontWeight: '600',
  },
  responseCard: {
    backgroundColor: '#FFFBE6', // Light yellow tint[cite: 4]
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  responseDetails: {
    flex: 1,
  },
  responseMainText: {
    fontSize: 14,
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  responseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginVertical: 4,
  },
  responseNote: {
    fontSize: 12,
    color: '#999',
  },
  responseActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFEBEB',
  },
  acceptBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFFFF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendList: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  amountNegative: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc3545',
  },
});