import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  signUpSchema,
  SignUpFormData,
} from "../schemas/signupSchema";

export default function SignUpScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = () => {
    Alert.alert("Success", "Account created!");
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

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>Join us today</Text>

        {[
          {
            name: "fullName",
            placeholder: "Full Name",
          },
          {
            name: "email",
            placeholder: "Email",
          },
          {
            name: "password",
            placeholder: "Password",
            secure: true,
          },
          {
            name: "confirmPassword",
            placeholder: "Confirm Password",
            secure: true,
          },
        ].map((field) => (
          <View key={field.name}>
            <Controller
              control={control}
              name={field.name as keyof SignUpFormData}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={field.placeholder}
                  secureTextEntry={field.secure}
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    errors[field.name as keyof SignUpFormData] &&
                      styles.errorInput,
                  ]}
                />
              )}
            />

            {errors[field.name as keyof SignUpFormData] && (
              <Text style={styles.error}>
                {errors[field.name as keyof SignUpFormData]?.message}
              </Text>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.button,
            !isValid && styles.disabled,
          ]}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
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
    backgroundColor: "rgba(255,255,255,.20)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.45)",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1e40af",
  },

  subtitle: {
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
    fontSize: 18,
    fontWeight: "600",
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
});