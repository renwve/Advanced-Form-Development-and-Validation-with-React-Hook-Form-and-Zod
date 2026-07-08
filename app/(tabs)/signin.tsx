import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  signInSchema,
  SignInFormData,
} from "../schemas/signinSchema";

export default function SignInScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = () => {
    Alert.alert("Success", "Signed in successfully!");
  };

  return (
    <ImageBackground
      source={require("../../assets/blue-wallpaper.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <BlurView intensity={70} tint="light" style={styles.card}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/")}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#2563eb"
          />
        </TouchableOpacity>

        <Text style={styles.title}>Employee Form</Text>

        <Text style={styles.title}>Welcome</Text>

        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              style={[
                styles.input,
                errors.email && styles.errorInput,
              ]}
            />
          )}
        />

        {errors.email && (
          <Text style={styles.error}>
            {errors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              style={[
                styles.input,
                errors.password && styles.errorInput,
              ]}
            />
          )}
        />

        {errors.password && (
          <Text style={styles.error}>
            {errors.password.message}
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            !isValid && styles.disabled,
          ]}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>
            Sign In
          </Text>
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
    backgroundColor: "#dcefff",
  },

  card: {
    width: "88%",
    maxWidth: 500,
    padding: 30,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.20)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1e40af",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "rgba(255,255,255,.45)",
    padding: 16,
    borderRadius: 30,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },

  errorInput: {
    borderColor: "red",
  },

  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 30,
    marginTop: 15,
  },

  disabled: {
    backgroundColor: "#9ca3af",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
});