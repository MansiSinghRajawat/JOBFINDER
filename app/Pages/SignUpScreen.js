// FORMik: 1. Import Formik and Yup
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons as Icon,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator, // Import ActivityIndicator for submission loading
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import SocialButton from "~/components/SocialButton";
import { COLORS } from "~/constants/colors";

// --- Reusable Components (No changes needed here) ---

const CustomInput = ({
  label,
  iconName,
  placeholder,
  isPassword,
  style,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={style.inputWrapper}>
      <Text style={style.label}>{label}</Text>
      <View style={style.inputContainer}>
        <FontAwesome
          name={iconName}
          size={style.iconSize.fontSize}
          color={COLORS.gray}
          style={style.inputIcon}
        />
        <TextInput
          style={style.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? "visibility-off" : "visibility"}
              size={style.iconSize.fontSize}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const RoleSelector = ({
  iconName,
  iconLib,
  text,
  selected,
  onPress,
  style,
}) => (
  <TouchableOpacity
    style={[style.roleButton, selected && style.roleButtonSelected]}
    onPress={onPress}
  >
    {iconLib === "FontAwesome5" ? (
      <FontAwesome5
        name={iconName}
        size={style.roleIconSize.fontSize}
        color={selected ? COLORS.primary : COLORS.gray}
      />
    ) : (
      <Icon
        name={iconName}
        size={style.roleIconSize.fontSize}
        color={selected ? COLORS.primary : COLORS.gray}
      />
    )}
    <Text style={[style.roleText, selected && style.roleTextSelected]}>
      {text}
    </Text>
  </TouchableOpacity>
);

// FORMik: 2. Define Validation Schema with Yup
// This defines the rules for each form field.
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().matches(
    /^[0-9]{10}$/,
    "Phone number must be exactly 10 digits"
  ),
  // .nullable(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // Must match the 'password' field
    .required("Confirming your password is required"),
  role: Yup.string().required("Please select a role"),
  agreed: Yup.boolean()
    .oneOf([true], "You must accept the Terms of Service and Privacy Policy")
    .required("You must accept the Terms of Service and Privacy Policy"),
});

// --- Main Screen Component with Formik ---

const SignUpScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  // This function will be called when the form is submitted and valid
  const handleSignUp = (values, { setSubmitting }) => {
    console.log("Form Values:", values);
    // Simulate an API call
    setTimeout(() => {
      alert(`Account created for ${values.firstName} as a ${values.role}!`);
      setSubmitting(false); // Tell Formik the submission is complete
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGray} />

      {/* FORMik: 4. Wrap your form content in the <Formik> component */}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "job_seeker", // Set initial role
          agreed: false,
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {/* This is a render prop. Formik passes state and helpers here. */}
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
        }) => (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>
                Join JobFinder today and unlock your career potential.
              </Text>
            </View>

            {/* FORMik: 5. Connect each input to Formik state and validation */}
            <CustomInput
              style={styles}
              label="First Name"
              iconName="user"
              placeholder="e.g., Ada"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <CustomInput
              style={styles}
              label="Last Name"
              iconName="user"
              placeholder="e.g., Lovelace"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <CustomInput
              style={styles}
              label="Email Address"
              iconName="envelope"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <CustomInput
              style={styles}
              label="Phone Number (Optional)"
              iconName="phone"
              placeholder="+91 XXXXXXXXXX"
              keyboardType="phone-pad"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            {/* No error display for optional field */}

            <CustomInput
              style={styles}
              label="Password"
              iconName="lock"
              placeholder="Create a strong password"
              isPassword
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <CustomInput
              style={styles}
              label="Confirm Password"
              iconName="lock"
              placeholder="Re-enter your password"
              isPassword
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* FORMik: 6. Connect custom components like RoleSelector using setFieldValue */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>I am a:</Text>
              <View style={styles.roleContainer}>
                <RoleSelector
                  style={styles}
                  iconName="user"
                  iconLib="FontAwesome5"
                  text="Job Seeker"
                  selected={values.role === "job_seeker"}
                  onPress={() => setFieldValue("role", "job_seeker")}
                />
                <RoleSelector
                  style={styles}
                  iconName="building"
                  iconLib="FontAwesome5"
                  text="Employer"
                  selected={values.role === "employer"}
                  onPress={() => setFieldValue("role", "employer")}
                />
              </View>
            </View>

            {/* FORMik: 7. Connect the checkbox and its validation */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  values.agreed && styles.checkboxChecked,
                ]}
                onPress={() => setFieldValue("agreed", !values.agreed)}
              >
                {values.agreed && (
                  <Icon
                    name="check"
                    size={styles.checkIconSize.fontSize}
                    color={COLORS.white}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to JobFinder's{" "}
                <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>
            </View>
            {touched.agreed && errors.agreed && (
              <Text style={styles.errorText}>{errors.agreed}</Text>
            )}

            {/* FORMik: 8. Connect the submit button */}
            <TouchableOpacity
              style={[
                styles.createButton,
                // Disable button if form is invalid, user hasn't agreed, or is submitting
                (!isValid || !values.agreed || isSubmitting) &&
                  styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isValid || !values.agreed || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <>
                  <Text style={styles.createButtonText}>Create Account</Text>
                  <Icon
                    name="arrow-forward"
                    size={styles.iconSize.fontSize}
                    color={COLORS.white}
                  />
                </>
              )}
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or sign up with</Text>
              <View style={styles.separatorLine} />
            </View>

           
            <View style={styles.socialContainer}>
              <SocialButton
                iconName="google"
                text="Google"
                color={COLORS.googleRed}
                onPress={() =>
                  Alert.alert("Social Sign-Up", "Signing up with Google")
                }
              />
              <SocialButton
                iconName="linkedin-square"
                text="LinkedIn"
                color={COLORS.linkedInBlue}
                onPress={() =>
                  Alert.alert("Social Sign-Up", "Signing up with LinkedIn")
                }
              />
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              {/* 3. Use router.push to navigate */}
              <TouchableOpacity
                onPress={() => router.push("/Pages/LoginScreen")}
              >
                <Text style={[styles.loginText, styles.linkText]}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

// --- Dynamic Stylesheet Factory ---

const DESIGN_WIDTH = 375;
const getStyles = (width) => {
  const scaleFactor = Math.min(width / DESIGN_WIDTH, 1.2);
  const responsiveSize = (size) => Math.round(size * scaleFactor);

  return StyleSheet.create({
    // ... all your existing styles
    safeArea: { flex: 1, backgroundColor: COLORS.lightGray },
    scrollContainer: {
      paddingHorizontal: responsiveSize(20),
      paddingVertical: responsiveSize(20),
      paddingBottom: responsiveSize(40),
    },
    header: { alignItems: "center", marginVertical: responsiveSize(20) },
    title: {
      fontSize: responsiveSize(28),
      fontWeight: "bold",
      color: COLORS.black,
      marginBottom: responsiveSize(8),
    },
    subtitle: {
      fontSize: responsiveSize(16),
      color: COLORS.darkGray,
      textAlign: "center",
    },
    inputWrapper: { marginBottom: responsiveSize(15) },
    label: {
      fontSize: responsiveSize(14),
      color: COLORS.black,
      marginBottom: responsiveSize(8),
      fontWeight: "500",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
      borderRadius: responsiveSize(8),
      minHeight: responsiveSize(55),
      paddingHorizontal: responsiveSize(15),
      paddingVertical: responsiveSize(5),
    },
    inputIcon: { marginRight: responsiveSize(10) },
    input: { flex: 1, fontSize: responsiveSize(16), color: COLORS.black },
    iconSize: { fontSize: responsiveSize(22) },
    roleIconSize: { fontSize: responsiveSize(24) },
    checkIconSize: { fontSize: responsiveSize(16) },
    strengthText: {
      fontSize: responsiveSize(12),
      color: COLORS.gray,
      marginTop: responsiveSize(-10),
      marginBottom: responsiveSize(15),
    },
    roleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: responsiveSize(15),
    },
    roleButton: {
      flex: 1,
      padding: responsiveSize(20),
      borderWidth: 1.5,
      borderColor: COLORS.inputBorder,
      borderRadius: responsiveSize(8),
      backgroundColor: COLORS.white,
      alignItems: "center",
      justifyContent: "center",
    },
    roleButtonSelected: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.selectedBg,
    },
    roleText: {
      marginTop: responsiveSize(8),
      fontSize: responsiveSize(16),
      color: COLORS.darkGray,
    },
    roleTextSelected: { color: COLORS.primary, fontWeight: "bold" },
    termsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: responsiveSize(10),
      marginBottom: responsiveSize(10),
    },
    checkbox: {
      width: responsiveSize(22),
      height: responsiveSize(22),
      borderWidth: 1.5,
      borderColor: COLORS.gray,
      borderRadius: responsiveSize(4),
      marginRight: responsiveSize(12),
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxChecked: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    termsText: {
      flex: 1,
      fontSize: responsiveSize(14),
      color: COLORS.darkGray,
      lineHeight: responsiveSize(20),
    },
    linkText: { color: COLORS.primary, fontWeight: "bold" },
    createButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: responsiveSize(15),
      borderRadius: responsiveSize(8),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginTop: responsiveSize(10),
    },
    // FORMik: 9. Add a disabled style for the button
    buttonDisabled: {
      backgroundColor: COLORS.gray,
    },
    createButtonText: {
      color: COLORS.white,
      fontSize: responsiveSize(18),
      fontWeight: "bold",
      marginRight: responsiveSize(10),
    },
    separatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: responsiveSize(24),
    },
    separatorLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#D1D5DB",
    },
    separatorText: {
      marginHorizontal: responsiveSize(16),
      color: COLORS.gray,
      fontSize: responsiveSize(14),
    },

    socialContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: responsiveSize(15),
    },
    socialButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: responsiveSize(15),
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
      borderRadius: responsiveSize(8),
      backgroundColor: COLORS.white,
    },
    socialButtonText: {
      marginLeft: responsiveSize(10),
      fontSize: responsiveSize(16),
      fontWeight: "bold",
      color: COLORS.black,
    },
    loginContainer: {
      flexDirection: "row",
      marginVertical: responsiveSize(20),
      alignItems: "center",
      justifyContent: "center",
    },
    loginText: {
      textAlign: "center",
      marginTop: responsiveSize(30),
      color: COLORS.darkGray,
      fontSize: responsiveSize(14),
    },
    // FORMik: 10. Add a style for error messages
    errorText: {
      fontSize: responsiveSize(12),
      color: COLORS.error,
      marginTop: responsiveSize(-10), // pull it closer to the input
      marginBottom: responsiveSize(10),
    },
  });
};

export default SignUpScreen;
