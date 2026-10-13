import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SendScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>New Expense</Text>
      
      <View style={styles.inputCard}>
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.amountInput} placeholder="$0.00" keyboardType="numeric" />
        
        <Text style={styles.label}>What was this for?</Text>
        <TextInput style={styles.textInput} placeholder="e.g. Rent, Dinner, etc." />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Split Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 10 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 20 },
  inputCard: { backgroundColor: 'white', padding: 20, borderRadius: 16, marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 },
  amountInput: { fontSize: 40, fontWeight: 'bold', color: '#6b4eff', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  textInput: { fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  button: { backgroundColor: '#6b4eff', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});