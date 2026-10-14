import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryScreen({ initialFriend = null, onBack, settledFriends, setSettledFriends, transactions }: any) {
  const [selectedFriend, setSelectedFriend] = useState<any>(initialFriend);
  const [settleModalVisible, setSettleModalVisible] = useState(false);

  useEffect(() => {
    setSelectedFriend(initialFriend);
  }, [initialFriend]);

  const handleSettleUp = () => {
    if (selectedFriend && !settledFriends.includes(selectedFriend.friendId)) {
      setSettledFriends([...settledFriends, selectedFriend.friendId]);
    }
    setSettleModalVisible(false);
  };

  const handleBack = () => {
    setSelectedFriend(null); 
    if (onBack) onBack();    
  };

  if (!selectedFriend) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Transactions</Text>
          <Text style={styles.subtitle}>Tap a friend to see your history</Text>
        </View>

        <View style={styles.listContainer}>
          {transactions.map((tx: any) => {
            const isSettled = settledFriends.includes(tx.friendId);

            return (
              <TouchableOpacity key={tx.id} style={styles.card} activeOpacity={0.7} onPress={() => setSelectedFriend(tx)}>
                <View>
                  <View style={[styles.avatar, { backgroundColor: tx.color }]}><Text style={styles.avatarText}>{tx.initials}</Text></View>
                  {tx.hasBadge && !isSettled && (
                    <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
                  )}
                </View>
                <View style={styles.details}>
                  <Text style={styles.name}>{tx.name}</Text>
                  <Text style={styles.note}>{tx.note}</Text>
                </View>
                <View style={styles.rightSection}>
                  {!isSettled ? (
                    <>
                      <Text style={[styles.amount, { color: tx.isPositive ? '#28a745' : '#dc3545' }]}>{tx.amount}</Text>
                      <Text style={styles.status}>{tx.status}</Text>
                    </>
                  ) : (
                    <Text style={styles.settledText}>Settled</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={16} color="#ccc" style={styles.chevron} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  const isCurrentlySettled = settledFriends.includes(selectedFriend.friendId);

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.friendHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.friendProfileInfo}>
            <View style={[styles.avatarLarge, { backgroundColor: selectedFriend.color }]}><Text style={styles.avatarTextLarge}>{selectedFriend.initials}</Text></View>
            <View>
              <Text style={styles.friendNameLarge}>{selectedFriend.name}</Text>
              <Text style={styles.friendHandleLarge}>{selectedFriend.handle} · {selectedFriend.code}</Text>
            </View>
          </View>

          <View style={[styles.balanceBanner, isCurrentlySettled && styles.balanceBannerSettled]}>
            <View>
              <Text style={styles.bannerLabel}>{isCurrentlySettled ? 'All settled up' : (selectedFriend.isPositive ? 'They owe you' : 'You owe them')}</Text>
              <Text style={[styles.bannerAmount, isCurrentlySettled && { color: '#666' }]}>{isCurrentlySettled ? '$0.00' : selectedFriend.amount.replace('+', '').replace('-', '')}</Text>
            </View>
            {!isCurrentlySettled && (
              <TouchableOpacity style={styles.settleBtn} onPress={() => setSettleModalVisible(true)}>
                <Text style={styles.settleBtnText}>Settle Up</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.historyContent}>
          <View style={styles.historyCard}>
            <View style={styles.historyCardRow}>
              <View>
                <Text style={styles.historyNote}>{selectedFriend.note || '"Shared Expense"'}</Text>
                <Text style={styles.historyDate}>Recent</Text>
                <View style={styles.confirmedRow}>
                  <Ionicons name="checkmark-circle-outline" size={14} color="#28a745" />
                  <Text style={styles.confirmedText}>Confirmed</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.historyAmount, { color: selectedFriend.isPositive ? '#28a745' : '#dc3545' }]}>{selectedFriend.amount}</Text>
                <Text style={styles.historyStatus}>{selectedFriend.isPositive ? `${selectedFriend.name.split(' ')[0]} owes you` : `You owe ${selectedFriend.name.split(' ')[0]}`}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={settleModalVisible} onRequestClose={() => setSettleModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settle Up</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setSettleModalVisible(false)}>
                <Ionicons name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={[styles.modalSummaryCard, !selectedFriend.isPositive && { backgroundColor: '#FFEBEB', borderColor: '#FFD6D6' }]}>
              <View style={[styles.avatar, { backgroundColor: selectedFriend.color, width: 48, height: 48, borderRadius: 24, marginRight: 15 }]}><Text style={styles.avatarText}>{selectedFriend.initials}</Text></View>
              <View>
                <Text style={styles.modalSummaryLabel}>{selectedFriend.isPositive ? `${selectedFriend.name.split(' ')[0]} owes you` : `You owe ${selectedFriend.name.split(' ')[0]}`}</Text>
                <Text style={[styles.modalSummaryAmount, !selectedFriend.isPositive && { color: '#dc3545' }]}>${selectedFriend.rawAmount.toFixed(2)}</Text>
              </View>
            </View>

            <Text style={styles.modalSectionLabel}>REQUEST PAYMENT VIA</Text>
            <View style={styles.paymentMethodCard}>
              <View style={styles.paymentIconBg}><Ionicons name="cash-outline" size={20} color="#6b4eff" /></View>
              <View style={styles.paymentMethodDetails}>
                <Text style={styles.paymentMethodTitle}>E-Transfer</Text>
                <Text style={styles.paymentMethodSub}>{selectedFriend.name.split(' ')[0].toLowerCase()}@example.com</Text>
              </View>
              <TouchableOpacity style={styles.copyBtn}><Ionicons name="copy-outline" size={14} color="#6b4eff" style={{ marginRight: 4 }} /><Text style={styles.copyBtnText}>Copy</Text></TouchableOpacity>
            </View>

            <View style={styles.amountRow}>
              <Text style={styles.amountRowLabel}>Amount to request</Text>
              <Text style={styles.amountRowValue}>${selectedFriend.rawAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.infoBanner}>
              <Text style={styles.infoBannerText}>Once {selectedFriend.name.split(' ')[0]} sends you ${selectedFriend.rawAmount.toFixed(2)}, tap "Confirm Paid" below to mark the balance as settled.</Text>
            </View>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleSettleUp}>
              <Ionicons name="checkmark-circle-outline" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.confirmBtnText}>Confirm Paid · ${selectedFriend.rawAmount.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },
  header: { paddingHorizontal: 20, paddingTop: 80, paddingBottom: 20, backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#999' },
  listContainer: { padding: 20, paddingBottom: 100 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 24, marginBottom: 12, borderWidth: 1, borderColor: '#f0f0f0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  badge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#F5A623', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white' },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  details: { flex: 1, marginLeft: 16 },
  name: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  note: { fontSize: 13, color: '#999' },
  rightSection: { alignItems: 'flex-end', marginRight: 10 },
  amount: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  status: { fontSize: 12, color: '#999' },
  settledText: { fontSize: 15, fontWeight: '600', color: '#888' },
  chevron: { marginLeft: 4 },
  friendHeader: { backgroundColor: '#ffffff', paddingHorizontal: 20, paddingTop: 80, paddingBottom: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backText: { color: '#6b4eff', fontSize: 16, fontWeight: '500' },
  friendProfileInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatarLarge: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarTextLarge: { color: 'white', fontWeight: 'bold', fontSize: 24 },
  friendNameLarge: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 },
  friendHandleLarge: { fontSize: 14, color: '#999' },
  balanceBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EFFFF4', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#D4F5E1' },
  balanceBannerSettled: { backgroundColor: '#f0f0f0', borderColor: '#e0e0e0' },
  bannerLabel: { fontSize: 13, color: '#666', marginBottom: 4 },
  bannerAmount: { fontSize: 24, fontWeight: 'bold', color: '#00C875' },
  settleBtn: { backgroundColor: '#50C878', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  settleBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  historyContent: { padding: 20, paddingBottom: 100 },
  historyCard: { backgroundColor: 'white', padding: 20, borderRadius: 24, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  historyCardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  historyNote: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 6 },
  historyDate: { fontSize: 13, color: '#999', marginBottom: 10 },
  confirmedRow: { flexDirection: 'row', alignItems: 'center' },
  confirmedText: { color: '#28a745', fontSize: 12, marginLeft: 4 },
  historyAmount: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  historyStatus: { fontSize: 12, color: '#999' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 400 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  modalSummaryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFFFF4', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#D4F5E1', marginBottom: 24 },
  modalSummaryLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
  modalSummaryAmount: { fontSize: 28, fontWeight: 'bold', color: '#00C875' },
  modalSectionLabel: { fontSize: 12, fontWeight: 'bold', color: '#999', letterSpacing: 0.5, marginBottom: 12 },
  paymentMethodCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0', padding: 16, borderRadius: 16, marginBottom: 24 },
  paymentIconBg: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#F0EFFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  paymentMethodDetails: { flex: 1 },
  paymentMethodTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 2 },
  paymentMethodSub: { fontSize: 13, color: '#999' },
  copyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0EFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  copyBtnText: { color: '#6b4eff', fontSize: 12, fontWeight: '600' },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingHorizontal: 4 },
  amountRowLabel: { fontSize: 15, color: '#666' },
  amountRowValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  infoBanner: { backgroundColor: '#F5F8FF', padding: 16, borderRadius: 12, marginBottom: 24 },
  infoBannerText: { color: '#0047AB', fontSize: 13, lineHeight: 18 },
  confirmBtn: { flexDirection: 'row', backgroundColor: '#00C875', paddingVertical: 16, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  confirmBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});