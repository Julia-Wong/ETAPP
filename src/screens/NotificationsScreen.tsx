import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotificationsScreen({ onBack, notifications, setNotifications }: any) {
  
  const unreadCount = notifications.filter((n: any) => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n: any) => ({ ...n, unread: false })));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={20} color="#6b4eff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>{unreadCount} unread</Text>
          </View>
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markReadText}>Mark all read</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.list}>
        {notifications.map((notif: any) => (
          <View key={notif.id} style={[styles.card, notif.unread && styles.cardUnread]}>
            <View style={styles.iconContainer}>
              <Ionicons name={notif.icon} size={24} color={notif.iconColor} />
              {notif.unread && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notifText}>{notif.text}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },
  header: { paddingHorizontal: 20, paddingTop: 80, paddingBottom: 20, zIndex: 10 }, // Increased paddingTop to 80 for the notch
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, zIndex: 10 },
  backText: { color: '#6b4eff', fontSize: 16, fontWeight: '500' },
  headerTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#999', marginTop: 4 },
  markReadText: { color: '#6b4eff', fontSize: 14, fontWeight: '600' },
  list: { paddingHorizontal: 20 },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 16, borderRadius: 24, marginBottom: 12, alignItems: 'center' },
  cardUnread: { backgroundColor: '#f0f4ff' },
  iconContainer: { marginRight: 15, position: 'relative' },
  unreadDot: { position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#6b4eff', borderWidth: 1, borderColor: '#f0f4ff' },
  textContainer: { flex: 1 },
  notifText: { fontSize: 15, fontWeight: '500', color: '#333', marginBottom: 4 },
  notifTime: { fontSize: 13, color: '#999' }
});