import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/blue-wallpaper.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <BlurView intensity={45} tint="light" style={styles.card}>
        <Text style={styles.title}>Welcome</Text>

        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/signin")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/employee")}>
          <Text style={styles.link}>Employee Form</Text>
        </TouchableOpacity>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "88%",
    maxWidth: 500,
    padding: 30,
    borderRadius: 30,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,.45)",

    backgroundColor: "rgba(255,255,255,.18)",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1d4ed8",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: 6,
    marginBottom: 35,
  },

  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 15,
  },
});
