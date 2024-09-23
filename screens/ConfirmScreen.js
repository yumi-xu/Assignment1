import { View, Text, Modal, Button } from "react-native";
import React, { useContext } from "react";
import Card from "../components/Card";
import { GameContext } from "../context/GameContext";

export default function ConfirmScreen({ visible, onGoBack, onContinue }) {
  const { name, email, phone } = useContext(GameContext);
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View>
        <Card>
          <Text>Hello {name}</Text>
          <Text>Here is the information you entered:</Text>
          <Text>{email}</Text>
          <Text>{phone}</Text>
          <Text>If it is not correct, please go back and edit them.</Text>
          <Button title="Go Back" onPress={onGoBack} />
          <Button title="Continue" onPress={onContinue} />
        </Card>
      </View>
    </Modal>
  );
}
