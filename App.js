import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import React, { useContext } from "react";
import {GameContext, GameProvider} from "./context/GameContext";

const Entry = () => {
  const { currentScreen } = useContext(GameContext);
  if (currentScreen === 'start') {
    return <StartScreen />;
  }
  return <GameScreen />;
}

export default function App() {
  return (
    <View style={styles.container}>
      <GameProvider>
        {/*<Text>Open up App.js to start working on your app!</Text>*/}
        {/*<StatusBar style="auto" />*/}
        <Entry />
      </GameProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
