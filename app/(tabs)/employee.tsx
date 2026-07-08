import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  employeeSchema,
  EmployeeFormData,
} from "../schemas/employeeSchema";

export default function EmployeeScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
  });

  const onSubmit = () => {
    Alert.alert("Success", "Employee saved!");
  };

  return (
    <ImageBackground
      source={require("../../assets/blue-wallpaper.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <BlurView
        intensity={0}
        tint="light"
        style={styles.card}
      >
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

        <Text style={styles.title}>Employee Form</Text>

        <Text style={styles.subtitle}>
          Enter employee information
        </Text>

        {[
          {
            name: "employeeId",
            placeholder: "Employee ID",
          },
          {
            name: "fullName",
            placeholder: "Employee Name",
          },
          {
            name: "email",
            placeholder: "Email",
          },
          {
            name: "phone",
            placeholder: "Phone Number",
          },
          {
            name: "postalCode",
            placeholder: "Postal Code",
          },
          {
            name: "position",
            placeholder: "Position",
          },
        ].map((field) => (
          <View key={field.name}>
            <Controller
              control={control}
              name={field.name as keyof EmployeeFormData}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={field.placeholder}
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    errors[field.name as keyof EmployeeFormData] &&
                      styles.errorInput,
                  ]}
                />
              )}
            />

            {errors[field.name as keyof EmployeeFormData] && (
              <Text style={styles.error}>
                {errors[field.name as keyof EmployeeFormData]?.message}
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
          <Text style={styles.buttonText}>
            Save Employee
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

  card: {
    width: "88%",
    maxWidth: 500,
    padding: 30,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbeafe",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  input: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 30,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#cbd5e1",
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