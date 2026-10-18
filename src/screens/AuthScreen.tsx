import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../services/supabase';

export default function AuthScreen({
  onLogin,
  startOnCompleteProfile = false,
}: any) {
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'welcome' | 'completeProfile'>(startOnCompleteProfile ? 'completeProfile' : 'landing');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const displayFirstName = fullName ? fullName.split(' ')[0] : 'Jamie';

  const handleFinishLogin = () => {
    // Pass the typed data back to the app brain (use defaults if blank)
    onLogin({
      name: fullName || 'Jamie Doe',
      email: email || 'jamie@example.com'
    });
  };

  const handleSignUp = async () => {
    // 1. Create the secure login account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    
    if (authError) {
      alert(authError.message);
      return; // Stop here if there's an error
    }

    // 2. Save their actual name to your database table
    if (authData.user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert([
          { id: authData.user.id, name: fullName, email: email }
        ]);
        
      if (dbError) {
        console.log("Error saving name:", dbError.message);
      }
    }

    // 3. Move to the welcome screen
    setView('welcome'); 
  }; 
    
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user) {
      alert('Unable to find your account.');
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) {
      alert('Could not check your profile: ' + profileError.message);
      return;
    }

    if (!profile) {
      setView('completeProfile');
      return;
    }

    onLogin({
      name: profile.name,
      email: profile.email,
    });
  };

  const handleSaveProfile = async () => {
    const name = fullName.trim();

    if (!name) {
      alert('Please enter your name.');
      return;
    }

    setIsSavingProfile(true);

    try {
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError || !user || !user.email) {
        alert('Please sign in again.');
        return;
      }

      const { error: saveError } = await supabase
        .from('users')
        .upsert(
          {
            id: user.id,
            name: name,
            email: user.email,
          },
          {
            onConflict: 'id',
          }
        );

      if (saveError) {
        alert('Could not save profile: ' + saveError.message);
        return;
      }

      onLogin({
        name: name,
        email: user.email,
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  
  if (view === 'completeProfile') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Just one more step before you start splitting!
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>YOUR NAME</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.bottomFixed}>
          <TouchableOpacity
            style={styles.primaryBtnPurple}
            onPress={handleSaveProfile}
            disabled={isSavingProfile}
          >
            <Text style={styles.primaryBtnPurpleText}>
              {isSavingProfile ? 'Saving...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (view === 'landing') {
    return (
      <View style={styles.landingContainer}>
        <View style={styles.landingContent}>
          <View style={styles.logoBox}><Text style={styles.logoEmoji}>💸</Text></View>
          <Text style={styles.appName}>Tab</Text>
          <Text style={styles.tagline}>Split expenses, not friendships.</Text>
          <View style={styles.pillRow}>
            <View style={styles.pill}><Text style={styles.pillText}>Track debts</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>Request money</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>Settle up</Text></View>
          </View>
        </View>
        <View style={styles.landingBottom}>
          <TouchableOpacity style={styles.primaryBtnWhite} onPress={() => setView('signup')}>
            <Text style={styles.primaryBtnWhiteText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setView('login')}>
            <Text style={styles.secondaryBtnText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>By continuing you agree to our Terms & Privacy Policy</Text>
        </View>
      </View>
    );
  }

  if (view === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setView('landing')}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your account.</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.inputLabel}>EMAIL</Text>
          <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor="#999" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Text style={styles.inputLabel}>PASSWORD</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={styles.passwordInput} placeholder="Your password" placeholderTextColor="#999" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotBtn}><Text style={styles.forgotText}>Forgot password?</Text></TouchableOpacity>
          <View style={styles.demoBox}>
            <Text style={styles.demoText}>💡 Demo: enter any email & password to sign in</Text>
          </View>
        </View>
        <View style={styles.bottomFixed}>
          <TouchableOpacity style={styles.primaryBtnPurple} onPress={handleLogin}>
            <Text style={styles.primaryBtnPurpleText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (view === 'signup') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setView('landing')}>
            <Ionicons name="chevron-back" size={20} color="#6b4eff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Takes about 30 seconds.</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.inputLabel}>FULL NAME</Text>
          <TextInput style={styles.input} placeholder="e.g. Alex Rivera" placeholderTextColor="#999" value={fullName} onChangeText={setFullName} />
          <Text style={styles.inputLabel}>EMAIL</Text>
          <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor="#999" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Text style={styles.inputLabel}>PASSWORD</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={styles.passwordInput} placeholder="At least 6 characters" placeholderTextColor="#999" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomFixed}>
          <TouchableOpacity style={styles.primaryBtnPurple} onPress={handleSignUp}>
            <Text style={styles.primaryBtnPurpleText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (view === 'welcome') {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <View style={styles.welcomeContent}>
          <View style={styles.starIconBg}><Ionicons name="sparkles-outline" size={32} color="#6b4eff" /></View>
          <Text style={styles.welcomeTitle}>Welcome, {displayFirstName}!</Text>
          <Text style={styles.welcomeSubtitle}>Your unique friend code has been generated. Share it so friends can find you.</Text>
          <View style={styles.welcomeCodeCard}>
            <Text style={styles.welcomeCodeLabel}>YOUR FRIEND CODE</Text>
            <Text style={styles.welcomeCodeValue}>#JX5303</Text>
            <TouchableOpacity style={styles.welcomeCopyBtn}>
              <Ionicons name="copy-outline" size={16} color="white" style={{ marginRight: 6 }} />
              <Text style={styles.welcomeCopyText}>Copy Code</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.welcomeNoteCard}>
            <Text style={styles.welcomeNoteText}>📌 Save this code! Friends use it to add you. You can always find it in your Profile.</Text>
          </View>
        </View>
        <View style={styles.bottomFixed}>
          <TouchableOpacity style={styles.primaryBtnPurple} onPress={handleFinishLogin}>
            <Text style={styles.primaryBtnPurpleText}>Start Splitting 🎉</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  landingContainer: { flex: 1, backgroundColor: '#6b4eff', justifyContent: 'space-between' },
  landingContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logoBox: { width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  logoEmoji: { fontSize: 40 },
  appName: { fontSize: 42, fontWeight: 'bold', color: 'white', marginBottom: 12 },
  tagline: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 30 },
  pillRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  pillText: { color: 'white', fontSize: 13, fontWeight: '600' },
  landingBottom: { paddingHorizontal: 20, paddingBottom: 50 },
  primaryBtnWhite: { backgroundColor: 'white', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  primaryBtnWhiteText: { color: '#6b4eff', fontSize: 16, fontWeight: 'bold' },
  secondaryBtn: { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  secondaryBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  termsText: { textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backText: { color: '#6b4eff', fontSize: 16, fontWeight: '500' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#999' },
  form: { paddingHorizontal: 20, marginTop: 10 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: '#666', letterSpacing: 0.5, marginBottom: 8, marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 16, padding: 16, fontSize: 16, color: '#333' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 16, paddingHorizontal: 16 },
  passwordInput: { flex: 1, paddingVertical: 16, fontSize: 16, color: '#333' },
  forgotBtn: { alignSelf: 'flex-end', marginTop: 16 },
  forgotText: { color: '#6b4eff', fontWeight: '600', fontSize: 14 },
  demoBox: { backgroundColor: '#F5F8FF', padding: 16, borderRadius: 12, marginTop: 24 },
  demoText: { color: '#6b4eff', fontSize: 13, lineHeight: 20 },
  bottomFixed: { position: 'absolute', bottom: 40, left: 20, right: 20 },
  primaryBtnPurple: { backgroundColor: '#6b4eff', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  primaryBtnPurpleText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  containerCenter: { flex: 1, backgroundColor: '#ffffff', alignItems: 'center' },
  welcomeContent: { flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, width: '100%' },
  starIconBg: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0EFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  welcomeTitle: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  welcomeSubtitle: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  welcomeCodeCard: { backgroundColor: '#6b4eff', borderRadius: 24, padding: 30, alignItems: 'center', width: '100%', marginBottom: 24 },
  welcomeCodeLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  welcomeCodeValue: { color: 'white', fontSize: 48, fontWeight: 'bold', letterSpacing: 2, marginBottom: 24 },
  welcomeCopyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  welcomeCopyText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  welcomeNoteCard: { backgroundColor: '#FFFBE6', padding: 20, borderRadius: 16, width: '100%' },
  welcomeNoteText: { color: '#B86B11', fontSize: 13, lineHeight: 20, textAlign: 'center' }
});