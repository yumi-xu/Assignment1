import { View, Text, Modal, Button, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Card from "../components/Card";
import { GameContext } from "../context/GameContext";
import { colors } from "../utils/helper";

export default function ConfirmScreen({ visible, onGoBack, onContinue }) {
  const { name, email, phone } = useContext(GameContext);
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <Card>
          <View>
            <Text style={styles.text}>Hello {name}</Text>
            <Text style={styles.text}>
              Here is the information you entered:
            </Text>
            <Text style={styles.text}>{email}</Text>
            <Text style={styles.text}>{phone}</Text>
            <Text style={styles.text}>
              If it is not correct, please go back and edit them.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Go Back"
              onPress={onGoBack}
              color={colors.buttonTextRed}
            />
            <Button
              title="Continue"
              onPress={onContinue}
              color={colors.buttonTextBlue}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "80%",
  },
  text: {
    color: colors.textPurple,
    fontSize: 16,
    marginBottom: 10,
  },
});
