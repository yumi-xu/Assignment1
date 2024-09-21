import Checkbox from "expo-checkbox";
import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";

const validateName = (name) => {
  if (/\d/.test(name)) {
    return "Name should only contain non-numeric characters";
  }
  if (name.length <= 1) {
    return "Name should contain at least 2 characters";
  }
  return "";
}

const validateEmail = (email) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email!";
  }
  return "";
}

const validatePhone = (phone) => {
  if (
    !/^\d{10}$/.test(phone) ||
    phone[phone.length - 1] < 2
  ) {
    return "Invalid phone number!";
  }
  return "";
}

export default function StartScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkboxSelected, setCheckboxSelected] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  

  const handleNameChange = (name) => {
    setName(name);
    const error = validateName(name);
    setNameError(error);
  }

  const handlePhoneChange = (phone) => {
    setPhone(phone);
    const error = validatePhone(phone);
    setPhoneError(error);
  }

  const handleEmailChange = (email) => {
    setEmail(email);
    const error = validateEmail(email);
    setEmailError(error);
  }

  return (
    <View>
      <Card>
        <Input
          title="Name"
          value={name}
          onChangeText={handleNameChange}
          error={nameError}
        />
        <Input
          title="Email address"
          value={email}
          onChangeText={handleEmailChange}
          error={emailError}
        />
        <Input
          title="Phone Number"
          value={phone}
          onChangeText={handlePhoneChange}
          error={phoneError}
        />
        <Checkbox />
        <Button title="Register" />
        <Button title="Reset" />
      </Card>
    </View>
  );
}
