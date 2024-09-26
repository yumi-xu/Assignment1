import { View, StyleSheet } from "react-native";
import {colors} from "../utils/helper";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: colors.backgroundGrey,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    // width: "70%",
    // maxWidth: 400,
    alignItems: "center",
  },
});
