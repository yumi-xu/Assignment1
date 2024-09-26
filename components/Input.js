import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors } from "../utils/helper";

export default function Input({
  title,
  value,
  onChangeText,
  placeholder,
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    color: colors.textPurple,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    color: colors.textPurple,
    borderBottomWidth: 2,
    paddingHorizontal: 5,
  },
  errorText: {
    color: colors.textGrey,
    marginTop: 5,
  },
});
