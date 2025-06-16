import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator, // For loading state on button
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar, // Good practice to include
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions, // Hook for responsiveness
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import SocialButton from "~/components/SocialButton";
import { COLORS } from "~/constants/colors";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions(); // 2. Get screen width for responsiveness
  const styles = getStyles(width); // 3. Generate styles dynamically

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // Updated to handle submission state from Formik
  const handleLogin = (values, { setSubmitting }) => {
    console.log("Logging in with:", values);
    // Simulate an API call
    setTimeout(() => {
      Alert.alert("Login Success", `Welcome back, ${values.email}`);
      setSubmitting(false); // Tell Formik the submission is complete
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Log in to continue your journey.</Text>

          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isValid,
              isSubmitting, // Get submission state from Formik
            }) => (
              <>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.email && touched.email && styles.inputError,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={styles.iconSize.fontSize}
                      color={COLORS.textSecondary}
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="you@example.com"
                      placeholderTextColor={COLORS.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.password && touched.password && styles.inputError,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={styles.iconSize.fontSize}
                      color={COLORS.textSecondary}
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.textMuted}
                      secureTextEntry={!isPasswordVisible}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!isPasswordVisible)}
                    >
                      <MaterialCommunityIcons
                        name={
                          isPasswordVisible ? "eye-off-outline" : "eye-outline"
                        }
                        size={styles.iconSize.fontSize}
                        color={COLORS.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* Remember Me & Forgot Password */}
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={styles.rememberMe}
                    onPress={() =>
                      setFieldValue("rememberMe", !values.rememberMe)
                    }
                  >
                    <MaterialCommunityIcons
                      name={
                        values.rememberMe
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={styles.iconSize.fontSize}
                      color={
                        values.rememberMe
                          ? COLORS.primary
                          : COLORS.textSecondary
                      }
                    />
                    <Text style={styles.rememberMeText}>Remember Me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert("Redirect", "Forgot Password page")
                    }
                  >
                    <Text style={styles.linkText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Log In Button */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    (!isValid || isSubmitting) && styles.buttonDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <>
                      <Text style={styles.loginButtonText}>Log In</Text>
                      <MaterialCommunityIcons
                        name="arrow-right"
                        size={styles.iconSize.fontSize}
                        color={COLORS.white}
                      />
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          {/* Social Login Separator */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or log in with</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Social Login Buttons */}
          {/* <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert("Social Login", "Logging in with Google")
              }
            >
              <FontAwesome
                name="google"
                size={styles.iconSize.fontSize}
                color={COLORS.googleRed}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert("Social Login", "Logging in with LinkedIn")
              }
            >
              <FontAwesome
                name="linkedin"
                size={styles.iconSize.fontSize}
                color={COLORS.linkedInBlue}
              />
              <Text style={styles.socialButtonText}>LinkedIn</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.socialLoginContainer}>
            <SocialButton
              iconName="google"
              text="Google"
              color={COLORS.googleRed}
              onPress={() =>
                Alert.alert("Social Login", "Logging in with Google")
              }
            />
            <SocialButton
              iconName="linkedin"
              text="LinkedIn"
              color={COLORS.linkedInBlue}
              onPress={() =>
                Alert.alert("Social Login", "Logging in with LinkedIn")
              }
            />
          </View>
          {/* Sign Up Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/Pages/SignUpScreen")}
            >
              <Text style={[styles.footerText, styles.linkText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 4. Dynamic Stylesheet Factory
const DESIGN_WIDTH = 375; // The width of the screen the design was created for
const getStyles = (width) => {
  const scaleFactor = Math.min(width / DESIGN_WIDTH, 1.2); // Cap scaling at 1.2x
  const responsiveSize = (size) => Math.round(size * scaleFactor);

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    container: {
      flexGrow: 1,
      justifyContent: "center",
      padding: responsiveSize(20),
    },
    formContainer: {
      backgroundColor: COLORS.card,
      padding: responsiveSize(24),
      borderRadius: responsiveSize(20),
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: responsiveSize(8),
      elevation: 5,
    },
    title: {
      fontSize: responsiveSize(28),
      fontWeight: "bold",
      color: COLORS.textPrimary,
      textAlign: "center",
      marginBottom: responsiveSize(8),
    },
    subtitle: {
      fontSize: responsiveSize(16),
      color: COLORS.textSecondary,
      textAlign: "center",
      marginBottom: responsiveSize(24),
    },
    inputGroup: {
      marginBottom: responsiveSize(16),
    },
    label: {
      fontSize: responsiveSize(14),
      color: COLORS.textPrimary,
      marginBottom: responsiveSize(8),
      fontWeight: "500",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.inputBg,
      borderRadius: responsiveSize(8),
      borderWidth: 1,
      borderColor: COLORS.border,
      paddingHorizontal: responsiveSize(12),
      height: responsiveSize(50),
    },
    inputError: {
      borderColor: COLORS.error,
    },
    icon: {
      marginRight: responsiveSize(10),
    },
    iconSize: {
      fontSize: responsiveSize(22),
    },
    input: {
      flex: 1,
      fontSize: responsiveSize(16),
      color: COLORS.textPrimary,
    },
    errorText: {
      color: COLORS.error,
      fontSize: responsiveSize(12),
      marginTop: responsiveSize(4),
    },
    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: responsiveSize(24),
    },
    rememberMe: {
      flexDirection: "row",
      alignItems: "center",
    },
    rememberMeText: {
      marginLeft: responsiveSize(8),
      fontSize: responsiveSize(14),
      color: COLORS.textPrimary,
    },
    linkText: {
      color: COLORS.accent,
      fontSize: responsiveSize(14),
      fontWeight: "600",
    },
    loginButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.primary,
      paddingVertical: responsiveSize(14),
      borderRadius: responsiveSize(8),
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: responsiveSize(2),
    },
    buttonDisabled: {
      backgroundColor: COLORS.textSecondary,
    },
    loginButtonText: {
      color: COLORS.white,
      fontSize: responsiveSize(16),
      fontWeight: "bold",
      marginRight: responsiveSize(8),
    },
    separatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: responsiveSize(24),
    },
    separatorLine: {
      flex: 1,
      height: 1,
      backgroundColor: COLORS.border,
    },
    separatorText: {
      marginHorizontal: responsiveSize(16),
      color: COLORS.textSecondary,
      fontSize: responsiveSize(14),
    },
    socialLoginContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: responsiveSize(16),
    },
    socialButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: responsiveSize(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: responsiveSize(8),
    },
    socialButtonText: {
      marginLeft: responsiveSize(12),
      fontSize: responsiveSize(16),
      fontWeight: "600",
      color: COLORS.textPrimary,
    },
    footer: {
      marginTop: responsiveSize(24),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    footerText: {
      fontSize: responsiveSize(14),
      color: COLORS.textSecondary,
    },
  });
};

export default LoginScreen;
