import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { useState } from "react";
import Header from "@/components/header/Header";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function Index() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState<"POMO" | "SHORT" | "BREAK">(
    "POMO"
  );

  const colorIndex =
    currentTime === "POMO" ? 0 : currentTime === "SHORT" ? 1 : 2;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[colorIndex] }]}
    >
      <View style={{ paddingTop: Platform.OS === "android" ? 30 : 0 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Text style={styles.text}>{time}</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
