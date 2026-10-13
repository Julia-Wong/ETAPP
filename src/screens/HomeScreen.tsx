import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ onNavigate, unreadCount }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPending, setShowPending] = useState(true); // Tracks if request is resolved

  const handleResolveRequest = () => {
    setModalVisible(false);
    setShowPending(false); // Hides the pending request from the screen
  };

  return (
    <>
      <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
        {/* Top Purple Section */}
        <View style={styles.headerBackground}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.name}>Jamie 👋</Text>
            </View>
            <TouchableOpacity style={styles.notificationBtn} onPress={() => onNavigate('Notifications')}>
              <Ionicons name="notifications-outline" size={24} color="white" />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

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
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('Send', { whoOwes: 'i' })}>
              <View style={[styles.actionIconBg, { backgroundColor: '#F0EFFF' }]}><Ionicons name="trending-up" size={24} color="#6b4eff" /></View>
              <Text style={styles.actionText}>Log Debt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('Send', { whoOwes: 'they' })}>
              <View style={[styles.actionIconBg, { backgroundColor: '#EFFFF4' }]}><Ionicons name="trending-down" size={24} color="#28a745" /></View>
              <Text style={styles.actionText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('History')}>
              <View style={[styles.actionIconBg, { backgroundColor: '#FFF6E5' }]}><Ionicons name="time-outline" size={24} color="#F5A623" /></View>
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('Friends')}>
              <View style={[styles.actionIconBg, { backgroundColor: '#FFEBEB' }]}><Ionicons name="compass-outline" size={24} color="#dc3545" /></View>
              <Text style={styles.actionText}>Friends</Text>
            </TouchableOpacity>
          </View>

          {showPending && (
            <>
              <Text style={styles.sectionTitle}>Needs your response</Text>
              <TouchableOpacity style={styles.responseCard} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
                <View style={[styles.avatar, { backgroundColor: '#00A8FF' }]}><Text style={styles.avatarText}>CP</Text></View>
                <View style={styles.responseDetails}>
                  <Text style={styles.responseMainText}><Text style={styles.boldText}>Casey </Text>says they owe you</Text>
                  <Text style={styles.responseAmount}>$22.00</Text>
                  <Text style={styles.responseNote}>"Movie tickets 🎬"</Text>
                </View>
                <View style={styles.responseActions}>
                  <View style={styles.rejectBtn}><Ionicons name="close" size={20} color="#dc3545" /></View>
                  <View style={styles.acceptBtn}><Ionicons name="checkmark" size={20} color="#28a745" /></View>
                </View>
              </TouchableOpacity>
            </>
          )}

          {/* Friends Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friends</Text>
            <TouchableOpacity onPress={() => onNavigate('Friends')}><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
          </View>
          <View style={styles.friendList}>
            <TouchableOpacity style={styles.friendItem} onPress={() => onNavigate('History')}>
              <View style={[styles.avatar, { backgroundColor: '#9B51E0' }]}><Text style={styles.avatarText}>AR</Text></View>
              <Text style={styles.friendName}>Alex Rivera</Text>
              <Text style={styles.amountPositive}>+$25.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.friendItem} onPress={() => onNavigate('History')}>
              <View style={[styles.avatar, { backgroundColor: '#00C875' }]}><Text style={styles.avatarText}>JL</Text></View>
              <Text style={styles.friendName}>Jordan Lee</Text>
              <Text style={styles.amountNegative}>-$45.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.friendItem} onPress={() => onNavigate('History')}>
              <View style={[styles.avatar, { backgroundColor: '#F5A623' }]}><Text style={styles.avatarText}>SC</Text></View>
              <Text style={styles.friendName}>Sam Chen</Text>
              <Text style={styles.amountPositive}>+$120.00</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity Section */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Recent Activity</Text>
          <TouchableOpacity style={styles.activityCard} onPress={() => onNavigate('History')}>
            <View style={[styles.avatar, { backgroundColor: '#9B51E0' }]}><Text style={styles.avatarText}>AR</Text></View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityMainText}>Alex Rivera → You</Text>
              <Text style={styles.activitySubText}>"Dinner at Nobu 🍣" · Oct 14</Text>
            </View>
            <Text style={styles.amountPositive}>+$50.00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityCard} onPress={() => onNavigate('History')}>
            <View style={[styles.avatar, { backgroundColor: '#00C875' }]}><Text style={styles.avatarText}>JL</Text></View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityMainText}>Jordan Lee → You</Text>
              <Text style={styles.activitySubText}>"Lunch split 🍜" · Oct 12</Text>
            </View>
            <Text style={styles.amountPositive}>+$14.50</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Popup */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pending Request</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}><Ionicons name="close" size={20} color="#666" /></TouchableOpacity>
            </View>
            <View style={styles.modalUserCard}>
              <View style={[styles.avatar, { backgroundColor: '#00A8FF', width: 56, height: 56, borderRadius: 28 }]}><Text style={[styles.avatarText, { fontSize: 20 }]}>CP</Text></View>
              <View style={styles.modalUserDetails}>
                <Text style={styles.modalSayingText}>Casey Park says...</Text>
                <Text style={styles.modalAmountPositive}>+$22.00</Text>
                <Text style={styles.modalOweText}>they owe you</Text>
              </View>
            </View>
            <View style={styles.modalMessageBox}>
              <Text style={styles.modalMessageLabel}>Message</Text>
              <Text style={styles.modalMessageText}>"Movie tickets 🎬"</Text>
              <Text style={styles.modalDate}>Oct 15</Text>
            </View>
            <View style={styles.modalWarningBox}>
              <Text style={styles.modalWarningText}><Text style={{fontWeight: 'bold', color: '#B86B11'}}>What does this mean? </Text> Casey is saying they owe you $22.00. Accept to add it to your running balance.</Text>
            </View>
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.modalDeclineBtn} onPress={handleResolveRequest}>
                <Ionicons name="close" size={20} color="#dc3545" style={{marginRight: 6}} />
                <Text style={styles.modalDeclineText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalAcceptBtn} onPress={handleResolveRequest}>
                <Ionicons name="checkmark" size={20} color="white" style={{marginRight: 6}} />
                <Text style={styles.modalAcceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#6b4eff' },
  headerBackground: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40, backgroundColor: '#6b4eff' }, // Removed overlapping z-index
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, zIndex: 999 }, // Kept z-index for bell
  greeting: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 16 },
  name: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  notificationBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255, 255, 255, 0.15)', justifyContent: 'center', alignItems: 'center' },
  notificationBadge: { position: 'absolute', top: 10, right: 12, backgroundColor: '#ff4d4d', width: 14, height: 14, borderRadius: 7, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#6b4eff' },
  badgeText: { color: 'white', fontSize: 8, fontWeight: 'bold' },
  balanceCard: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 24, padding: 24 },
  balanceTitle: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  balanceAmount: { color: 'white', fontSize: 42, fontWeight: 'bold', marginTop: 8, marginBottom: 20 },
  splitBalances: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  splitBox: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 16, borderRadius: 16 },
  splitLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, marginBottom: 4 },
  owedAmount: { color: '#00E676', fontSize: 18, fontWeight: 'bold' },
  oweAmount: { color: '#FF7A7A', fontSize: 18, fontWeight: 'bold' },
  mainContent: { backgroundColor: '#ffffff', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 20, paddingTop: 30, paddingBottom: 100, marginTop: -20, minHeight: 600, zIndex: 2, elevation: 2 }, // Added z-index so buttons don't get covered
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 20, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, marginBottom: 30, elevation: 3, marginTop: -60 },
  actionItem: { alignItems: 'center', gap: 8 },
  actionIconBg: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  actionText: { fontSize: 12, color: '#666', fontWeight: '500' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  seeAllText: { color: '#6b4eff', fontSize: 14, fontWeight: '600' },
  responseCard: { backgroundColor: '#FFFBE6', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  responseDetails: { flex: 1 },
  responseMainText: { fontSize: 14, color: '#666' },
  boldText: { fontWeight: 'bold', color: '#333' },
  responseAmount: { fontSize: 16, fontWeight: 'bold', color: '#28a745', marginVertical: 4 },
  responseNote: { fontSize: 12, color: '#999' },
  responseActions: { flexDirection: 'row', gap: 12 },
  rejectBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFEBEB' },
  acceptBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EFFFF4', justifyContent: 'center', alignItems: 'center' },
  friendList: { backgroundColor: 'white', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
  friendItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  friendName: { flex: 1, fontSize: 16, fontWeight: '600', color: '#333' },
  amountPositive: { fontSize: 16, fontWeight: 'bold', color: '#28a745' },
  amountNegative: { fontSize: 16, fontWeight: 'bold', color: '#dc3545' },
  activityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#f0f0f0' },
  activityDetails: { flex: 1 },
  activityMainText: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  activitySubText: { fontSize: 13, color: '#999' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 400 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  modalUserCard: { backgroundColor: '#f8f9fc', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  modalUserDetails: { flex: 1 },
  modalSayingText: { fontSize: 14, color: '#666', marginBottom: 4 },
  modalAmountPositive: { fontSize: 28, fontWeight: 'bold', color: '#00C875', marginBottom: 4 },
  modalOweText: { fontSize: 14, color: '#666' },
  modalMessageBox: { borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 16, padding: 16, marginBottom: 16 },
  modalMessageLabel: { fontSize: 12, color: '#999', marginBottom: 8 },
  modalMessageText: { fontSize: 16, color: '#333', fontWeight: '500', marginBottom: 8 },
  modalDate: { fontSize: 12, color: '#999' },
  modalWarningBox: { backgroundColor: '#FFFBE6', padding: 16, borderRadius: 12, marginBottom: 24 },
  modalWarningText: { fontSize: 13, color: '#885000', lineHeight: 18 },
  modalActionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingBottom: 20 },
  modalDeclineBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: '#FFEBEB', backgroundColor: 'white' },
  modalDeclineText: { color: '#dc3545', fontSize: 16, fontWeight: 'bold' },
  modalAcceptBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, backgroundColor: '#00C875' },
  modalAcceptText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});