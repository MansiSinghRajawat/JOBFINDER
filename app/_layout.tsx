import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
     <Stack.Screen name="Pages/SignUpScreen" options={{headerShown:false}}/>
      <Stack.Screen
        name="Pages/LoginScreen"
        options={{ headerShown: false }}
      />
    </Stack>
    )
  
}
