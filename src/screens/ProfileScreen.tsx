import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.profileHeader}>
        <View style={styles.avatarBig}>
          <Text style={styles.avatarBigText}>J</Text>
        </View>
        <Text style={styles.userName}>Jamie Doe</Text>
        <Text style={styles.userHandle}>@jamiedoe</Text>
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.settingItem}>Account Settings</Text>
        <Text style={styles.settingItem}>Payment Methods</Text>
        <Text style={[styles.settingItem, { color: '#dc3545', borderBottomWidth: 0 }]}>Log Out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 10 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatarBig: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#6b4eff', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  avatarBigText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  userName: { fontSize: 22, fontWeight: 'bold' },
  userHandle: { fontSize: 16, color: '#666' },
  settingsGroup: { backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15 },
  settingItem: { fontSize: 16, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
});