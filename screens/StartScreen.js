import Checkbox from "expo-checkbox";
import React, { useState, useContext } from "react";
import { View, Button, Alert, Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import ConfirmScreen from "./ConfirmScreen";
import { GameContext } from "../context/GameContext";
import { validateName } from "../utils/validateName";
import { validateEmail } from "../utils/validateEmail";
import { validatePhone } from "../utils/validatePhone";
import { colors } from "../utils/helper";

export default function StartScreen() {
  const { name, setName, email, setEmail, phone, setPhone, setCurrentScreen } =
    useContext(GameContext);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const canRegister = checkboxSelected;

  const handleNameChange = (name) => {
    setName(name);
    const error = validateName(name);
    setNameError(error);
  };

  const handlePhoneChange = (phone) => {
    setPhone(phone);
    const error = validatePhone(phone);
    setPhoneError(error);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handleReset = () => {
    // clears all the inputs
    setName("");
    setEmail("");
    setPhone("");
    setNameError("");
    setEmailError("");
    setPhoneError("");

    // unselect the checkbox
    setCheckboxSelected(false);
  };

  const handleRegister = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    const hasError = !!(nameError || emailError || phoneError);

    if (hasError) {
      setNameError(nameError);
      setEmailError(emailError);
      setPhoneError(phoneError);
      const msg = [nameError, emailError, phoneError]
        .filter(Boolean)
        .join("\n");
      Alert.alert(msg);
      return;
    }
    setIsConfirmVisible(true);
  };

  const handleGoBack = () => {
    setIsConfirmVisible(false);
  };

  const handleContinue = () => {
    setIsConfirmVisible(false);
    setCurrentScreen("game");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Card>
        <View style={styles.form}>
          <Input
            title="Name:"
            value={name}
            onChangeText={handleNameChange}
            error={nameError}
          />
          <Input
            title="Email address:"
            value={email}
            onChangeText={handleEmailChange}
            error={emailError}
          />
          <Input
            title="Phone Number:"
            value={phone}
            onChangeText={handlePhoneChange}
            error={phoneError}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={checkboxSelected}
            onValueChange={setCheckboxSelected}
            color={checkboxSelected ? colors.textPurple : undefined}
          />
          <Text style={styles.checkboxText}>I am not a robot</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            color={colors.buttonTextRed}
            onPress={handleReset}
          />
          <Button
            title="Register"
            color={colors.buttonTextBlue}
            disabled={!canRegister}
            onPress={handleRegister}
          />
        </View>
      </Card>
      <ConfirmScreen
        visible={isConfirmVisible}
        onGoBack={handleGoBack}
        onContinue={handleContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundBlue,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPurple,
  },
  form: {
    width: 200,
  },
  inputText: {
    color: colors.textPurple,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: {
    marginLeft: 10,
    color: colors.textPurple,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    margin: 20,
  },
});
