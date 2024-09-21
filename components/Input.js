import { Text, TextInput, View, StyleSheet } from "react-native";

export default function Input({
  title,
  value,
  onChangeText,
  placeholder,
  error,
}) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
