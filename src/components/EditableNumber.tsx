import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onConfirm: () => void;
};

export default function EditableNumber({ value, onChange, onConfirm }: Props) {
  return (
    <View style={styles.row}>
      <TextInput keyboardType="numeric" style={styles.input} value={value} onChangeText={onChange} />
      <Button title="OK" onPress={onConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { backgroundColor: '#fff', padding: 8, width: 80, marginRight: 8, fontSize: 25 },
});
