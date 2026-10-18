import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../services/supabase';

export default function ProfileScreen({ onLogout, user }: any) {    
  const [myFriendCode, setMyFriendCode] = useState('');
  const [friendCodeError, setFriendCodeError] = useState('');

  useEffect(() => {
    let active = true;

    const loadFriendCode = async () => {
      const { data: { user: authUser }, error: authError } =
        await supabase.auth.getUser();

      if (!active) return;

      if (authError || !authUser) {
        setFriendCodeError('Please sign in again.');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('friend_code')
        .eq('id', authUser.id)
        .single();

      if (!active) return;

      if (error || !data?.friend_code) {
        setFriendCodeError('Could not load code');
        console.log('Profile friend code error:', error?.message);
        return;
      }

      setMyFriendCode(data.friend_code);
      setFriendCodeError('');
    };

    loadFriendCode();

    return () => {
      active = false;
    };
  }, []);

  const [currentView, setCurrentView] = useState<'main' | 'PersonalInfo' | 'Settings' | 'PaymentMethods' | 'Refer' | 'Rate'>('main');

  const nameParts = user?.name?.split(' ') || ['Jamie', 'Doe'];
  const initialFirst = nameParts[0] || '';
  const initialLast = nameParts.slice(1).join(' ') || '';

  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialLast);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [eTransfer, setETransfer] = useState('');

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const avatarInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'JD';
  const handleString = `@${firstName.toLowerCase()}${lastName.toLowerCase()}`;

  // ... (Keep PersonalInfo, Settings, and PaymentMethods exactly as they were in the previous file) ...
  if (currentView === 'PersonalInfo') {
    return (
      <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('main')}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>Personal Info</Text>
          <Text style={styles.subSubtitle}>Update your profile details</Text>
        </View>

        <View style={styles.formContent}>
          <Text style={styles.inputLabel}>FIRST NAME</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

          <Text style={styles.inputLabel}>LAST NAME</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

          <Text style={styles.inputLabel}>PHONE NUMBER</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="call-outline" size={20} color="#ccc" style={styles.inputIcon} />
            <TextInput style={styles.innerInput} placeholder="+1 (555) 000-0000" placeholderTextColor="#ccc" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          <Text style={styles.inputLabel}>EMAIL</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.inputIcon} />
            <TextInput style={styles.innerInput} value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>

          <View style={styles.supportNoteRow}>
            <Ionicons name="mail" size={14} color="#999" />
            <Text style={styles.supportNoteText}>Contact support to change your email address.</Text>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={() => setCurrentView('main')}>
            <Ionicons name="save-outline" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  }

  if (currentView === 'Settings') {
    return (
      <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('main')}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>Settings</Text>
          <Text style={styles.subSubtitle}>Manage your preferences</Text>
        </View>

        <View style={styles.formContent}>
          <Text style={styles.sectionHeading}>NOTIFICATIONS</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingRow}>
              <View style={styles.settingTextGroup}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingSub}>Alerts for requests & payments</Text>
              </View>
              <Switch value={pushEnabled} onValueChange={setPushEnabled} trackColor={{ true: '#6b4eff', false: '#e0e0e0' }} />
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingRow}>
              <View style={styles.settingTextGroup}>
                <Text style={styles.settingTitle}>Email Alerts</Text>
                <Text style={styles.settingSub}>Weekly summaries & reminders</Text>
              </View>
              <Switch value={emailEnabled} onValueChange={setEmailEnabled} trackColor={{ true: '#6b4eff', false: '#e0e0e0' }} />
            </View>
          </View>

          <Text style={styles.sectionHeading}>APPEARANCE</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingRow}>
              <View style={styles.settingTextGroup}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingSub}>Switch to a darker theme</Text>
              </View>
              <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#6b4eff', false: '#e0e0e0' }} />
            </View>
          </View>

          <Text style={styles.sectionHeading}>REGION</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingRowVertical}>
              <Text style={styles.settingTitle}>Default Currency</Text>
              <Text style={styles.settingSub}>Used for all transaction amounts</Text>
              <View style={styles.dropdownFake}>
                <Text style={styles.dropdownText}>🍁 CAD — Canadian Dollar</Text>
                <Ionicons name="chevron-down" size={16} color="#999" />
              </View>
            </View>
          </View>

          <Text style={styles.sectionHeading}>DANGER ZONE</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingTextGroup}>
                <Text style={styles.settingTitle}>Delete Account</Text>
                <Text style={styles.settingSub}>Permanently remove your account & data</Text>
              </View>
              <View style={styles.deleteBtnTag}>
                <Ionicons name="trash-outline" size={14} color="#dc3545" style={{ marginRight: 4 }} />
                <Text style={styles.deleteBtnText}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  }

  if (currentView === 'PaymentMethods') {
    return (
      <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('main')}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>Receive Payments</Text>
          <Text style={styles.subSubtitle}>Where friends send you money</Text>
        </View>

        <View style={styles.formContent}>
          <Text style={styles.inputLabel}>E-TRANSFER EMAIL / PHONE NUMBER</Text>
          <View style={styles.paymentInputRow}>
            <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} placeholder="e.g. jamie@gmail.com" placeholderTextColor="#ccc" value={eTransfer} onChangeText={setETransfer} />
            <TouchableOpacity style={styles.paymentSaveBtn}>
              <Text style={styles.paymentSaveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.inputLabel, { marginTop: 30 }]}>CURRENTLY SAVED</Text>
          <View style={styles.savedPaymentCard}>
            <View style={styles.savedPaymentTop}>
              <View style={styles.paymentIconBg}>
                <Ionicons name="cash-outline" size={24} color="#00C875" />
              </View>
              <View style={styles.savedPaymentDetails}>
                <Text style={styles.savedPaymentLabel}>E-Transfer recipient</Text>
                <Text style={styles.savedPaymentValue}>{email || 'jamie@example.com'}</Text>
              </View>
              <TouchableOpacity style={styles.copyIconBtn}>
                <Ionicons name="copy-outline" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            <Text style={styles.savedPaymentNote}>💡 Your friends will see this address when they tap "Settle Up" on a debt with you.</Text>
          </View>

          <View style={styles.howItWorksBox}>
            <Text style={styles.howItWorksText}>
              <Text style={{ fontWeight: 'bold' }}>How it works: </Text>
              When a friend settles up with you, Tab shows them your E-Transfer contact info so they can send the money directly. You then tap "Confirm Paid" to clear the balance.
            </Text>
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  }

  // --- NEW: REAL REFER A FRIEND SCREEN ---
  if (currentView === 'Refer') {
    return (
      <View style={styles.subContainer}>
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('main')}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.referContent}>
          <View style={styles.referGiftIcon}><Text style={{fontSize: 64}}>🎁</Text></View>
          <Text style={styles.referAmount}>Earn $5.00</Text>
          <Text style={styles.referTitle}>Invite friends, get paid</Text>
          <Text style={styles.referDesc}>Get $5 deposited straight to your balance for every friend who signs up and logs their first debt.</Text>
          
          <TouchableOpacity style={styles.referShareBtn}>
            <Ionicons name="share-outline" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.referShareBtnText}>Share Invite Link</Text>
          </TouchableOpacity>

          <Text style={styles.referTerms}>Read Terms & Conditions</Text>
        </View>
      </View>
    );
  }

  // --- NEW: REAL RATE THE APP SCREEN ---
  if (currentView === 'Rate') {
    return (
      <View style={styles.subContainer}>
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('main')}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rateContent}>
          <Text style={styles.rateTitle}>Enjoying Tab?</Text>
          <Text style={styles.rateSubtitle}>Tap a star to rate it on the App Store.</Text>
          
          <View style={styles.starsRow}>
            <Ionicons name="star" size={44} color="#F5A623" />
            <Ionicons name="star" size={44} color="#F5A623" />
            <Ionicons name="star" size={44} color="#F5A623" />
            <Ionicons name="star" size={44} color="#F5A623" />
            <Ionicons name="star-outline" size={44} color="#F5A623" />
          </View>

          <TouchableOpacity style={styles.rateSubmitBtn}>
            <Text style={styles.rateSubmitBtnText}>Submit Review</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentView('main')}>
             <Text style={styles.rateLaterText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- MAIN PROFILE VIEW ---
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBackground}>
        <View style={styles.topBar}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => setCurrentView('Settings')}>
            <Ionicons name="settings-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitials}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{firstName} {lastName}</Text>
            <Text style={styles.userHandle}>{handleString}</Text>
          </View>
        </View>

        <View style={styles.codeCard}>
          <View style={styles.codeInfo}>
            <Text style={styles.codeLabel}>Your Friend Code</Text>
            <Text style={styles.codeValue}>{friendCodeError || myFriendCode || 'Loading...'}</Text>
          </View>
          <TouchableOpacity style={styles.copyBtn}>
            <Ionicons name="copy-outline" size={16} color="white" style={styles.copyIcon} />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabelPurple}>ACCOUNT</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentView('PersonalInfo')}>
            <View style={styles.menuIconBg}><Ionicons name="person-outline" size={20} color="#666" /></View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Personal Info</Text>
              <Text style={styles.menuSubtitle}>Name, email, phone</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentView('PaymentMethods')}>
            <View style={styles.menuIconBg}><Ionicons name="card-outline" size={20} color="#666" /></View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Receive Payments</Text>
              <Text style={styles.menuSubtitle}>E-Transfer settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentView('Settings')}>
            <View style={styles.menuIconBg}><Ionicons name="shield-checkmark-outline" size={20} color="#666" /></View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Security & Settings</Text>
              <Text style={styles.menuSubtitle}>Preferences, notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabelGray}>MORE</Text>

        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentView('Refer')}>
            <View style={styles.menuIconBg}><Ionicons name="person-add-outline" size={20} color="#666" /></View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Refer a Friend</Text>
              <Text style={styles.menuSubtitle}>Invite and earn rewards</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentView('Rate')}>
            <View style={styles.menuIconBg}><Ionicons name="star-outline" size={20} color="#666" /></View>
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuTitle}>Rate the App</Text>
              <Text style={styles.menuSubtitle}>Love it? Leave a review</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutBtn} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={20} color="#dc3545" style={styles.signOutIcon} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },
  headerBackground: { backgroundColor: '#6b4eff', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  settingsBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  avatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  userDetails: { flex: 1 },
  userName: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  userHandle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  codeCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 16, marginBottom: 20 },
  codeInfo: { flex: 1 },
  codeLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 },
  codeValue: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  copyBtn: { flexDirection: 'row', alignItems: 'center' },
  copyIcon: { marginRight: 6 },
  copyText: { color: 'white', fontSize: 14, fontWeight: '500' },
  sectionLabelPurple: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  mainContent: { paddingHorizontal: 20, paddingTop: 20 },
  sectionLabelGray: { color: '#999', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10, marginTop: 10 },
  menuGroup: { backgroundColor: 'white', borderRadius: 24, paddingVertical: 10, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20 },
  menuIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f6f8', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuTextGroup: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 2 },
  menuSubtitle: { fontSize: 13, color: '#999' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 75 },
  signOutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 24, paddingVertical: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  signOutIcon: { marginRight: 8 },
  signOutText: { color: '#dc3545', fontSize: 16, fontWeight: 'bold' },
  bottomSpacer: { height: 120 },
  subContainer: { flex: 1, backgroundColor: '#f8f9fc' },
  subHeader: { paddingHorizontal: 20, paddingTop: 80, paddingBottom: 20, backgroundColor: 'transparent' },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { color: '#6b4eff', fontSize: 16, fontWeight: '500' },
  subTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 },
  subSubtitle: { fontSize: 14, color: '#999' },
  formContent: { padding: 20 },
  inputLabel: { fontSize: 12, color: '#999', fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 16, padding: 16, fontSize: 15, color: '#333', marginBottom: 16 },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16 },
  inputIcon: { marginRight: 10 },
  innerInput: { flex: 1, paddingVertical: 16, fontSize: 15, color: '#333' },
  supportNoteRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, paddingHorizontal: 4 },
  supportNoteText: { fontSize: 13, color: '#999', marginLeft: 6 },
  saveBtn: { backgroundColor: '#6b4eff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, borderRadius: 16 },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  sectionHeading: { fontSize: 12, color: '#999', fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 12, marginTop: 24 },
  settingsGroup: { backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#f0f0f0' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  settingDivider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 20 },
  settingTextGroup: { flex: 1, paddingRight: 15 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  settingSub: { fontSize: 13, color: '#999' },
  settingRowVertical: { padding: 20 },
  dropdownFake: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#cbbaf5', borderRadius: 12, padding: 16, marginTop: 12, backgroundColor: '#F8F5FF' },
  dropdownText: { fontSize: 15, color: '#1a1a1a', fontWeight: '500' },
  deleteBtnTag: { flexDirection: 'row', alignItems: 'center' },
  deleteBtnText: { color: '#dc3545', fontWeight: 'bold', fontSize: 15 },
  paymentInputRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  paymentSaveBtn: { backgroundColor: '#cbbaf5', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 16 },
  paymentSaveBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  savedPaymentCard: { backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#f0f0f0', padding: 20, marginTop: 12 },
  savedPaymentTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  paymentIconBg: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EFFFF4', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  savedPaymentDetails: { flex: 1 },
  savedPaymentLabel: { fontSize: 13, color: '#999', marginBottom: 2 },
  savedPaymentValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  copyIconBtn: { padding: 8 },
  savedPaymentNote: { fontSize: 13, color: '#666', lineHeight: 18 },
  howItWorksBox: { backgroundColor: '#F5F8FF', padding: 20, borderRadius: 16, marginTop: 30 },
  howItWorksText: { color: '#0047AB', fontSize: 14, lineHeight: 22 },
  
  // Refer & Rate Styles
  referContent: { padding: 20, alignItems: 'center', marginTop: 20 },
  referGiftIcon: { backgroundColor: '#F0EFFF', width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  referAmount: { fontSize: 24, fontWeight: 'bold', color: '#00C875', marginBottom: 8 },
  referTitle: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  referDesc: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 24, paddingHorizontal: 10, marginBottom: 40 },
  referShareBtn: { flexDirection: 'row', backgroundColor: '#6b4eff', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, alignItems: 'center', width: '100%', justifyContent: 'center', marginBottom: 24 },
  referShareBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  referTerms: { color: '#999', fontSize: 13, textDecorationLine: 'underline' },

  rateContent: { padding: 20, alignItems: 'center', marginTop: 40 },
  rateTitle: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  rateSubtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  starsRow: { flexDirection: 'row', gap: 12, marginBottom: 50 },
  rateSubmitBtn: { backgroundColor: '#6b4eff', paddingVertical: 16, borderRadius: 16, alignItems: 'center', width: '100%', marginBottom: 20 },
  rateSubmitBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  rateLaterText: { color: '#666', fontSize: 15, fontWeight: '600' }
});