import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Timer from "@/components/timer/Timer";
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

const optionsTimes = {
  POMO: 25,
  SHORT: 5,
  BREAK: 15,
};

export default function Index() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState<"POMO" | "SHORT" | "BREAK">(
    "POMO"
  );
  const [isActive, setIsActive] = useState(false);

  const colorIndex =
    currentTime === "POMO" ? 0 : currentTime === "SHORT" ? 1 : 2;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(optionsTimes[currentTime] * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function HandleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/click.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[colorIndex] }]}
    >
      <View
        style={{
          paddingTop: Platform.OS === "android" ? 30 : 0,
          paddingHorizontal: 15,
          flex: 1,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={HandleStartStop}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
