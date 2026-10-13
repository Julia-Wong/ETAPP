import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      
      {/* Top Purple Header Section */}
      <View style={styles.headerBackground}>
        
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Jamie Doe</Text>
            <Text style={styles.userHandle}>@jamiedoe</Text>
          </View>
        </View>

        {/* Friend Code Card */}
        <View style={styles.codeCard}>
          <View style={styles.codeInfo}>
            <Text style={styles.codeLabel}>Your Friend Code</Text>
            <Text style={styles.codeValue}>#JD4821</Text>
          </View>
          <TouchableOpacity style={styles.copyBtn}>
            <Ionicons name="copy-outline" size={16} color="white" style={styles.copyIcon} />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabelPurple}>ACCOUNT</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        
        {/* Account Menu Group */}
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="person-outline" size={20} color="#666" />
            </View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Personal Info</Text>
              <Text style={styles.menuSubtitle}>Name, email, phone</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="card-outline" size={20} color="#666" />
            </View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Payment Methods</Text>
              <Text style={styles.menuSubtitle}>Link bank or card</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
            </View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Security</Text>
              <Text style={styles.menuSubtitle}>Password, 2FA</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabelGray}>MORE</Text>

        {/* More Menu Group */}
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="person-add-outline" size={20} color="#666" />
            </View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Refer a Friend</Text>
              <Text style={styles.menuSubtitle}>Invite and earn rewards</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="star-outline" size={20} color="#666" />
            </View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Rate the App</Text>
              <Text style={styles.menuSubtitle}>Love it? Leave a review</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="help-circle-outline" size={20} color="#666" />
            </View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuSubtitle}>FAQs, contact us</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#dc3545" style={styles.signOutIcon} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

      </View>
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  headerBackground: {
    backgroundColor: '#6b4eff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userHandle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  codeInfo: {
    flex: 1,
  },
  codeLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  codeValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyIcon: {
    marginRight: 6,
  },
  copyText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionLabelPurple: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionLabelGray: {
    color: '#999',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  menuGroup: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f6f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuTextGroup: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 75,
  },
  signOutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 100, // Extra space for the bottom tab bar
  },
});