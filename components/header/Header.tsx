import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  currentTime: "POMO" | "SHORT" | "BREAK";
  setCurrentTime: (value: "POMO" | "SHORT" | "BREAK") => void;
  setTime: (value: number) => void;
};

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({
  setTime,
  currentTime,
  setCurrentTime,
}: HeaderProps) {
  function handlePress(index: number) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    const newCurrentTime =
      index === 0 ? "POMO" : index === 1 ? "SHORT" : "BREAK";
    setCurrentTime(newCurrentTime);
    setTime(newTime * 60);
  }

  //MINUTO VIDEO 1:23:28

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index) => {
        const correspondingTime =
          index === 0 ? "POMO" : index === 1 ? "SHORT" : "BREAK";
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.itemStyle,
              currentTime !== correspondingTime && {
                borderColor: "transparent",
              },
            ]}
          >
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    borderWidth: 3,
    padding: 5,
    borderColor: "#fff",
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
