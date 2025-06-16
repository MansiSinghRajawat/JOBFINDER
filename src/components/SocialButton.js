// File: src/components/SocialButton.js

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors'; // Import centralized colors

// The component receives all the data it needs as props
const SocialButton = ({ iconName, text, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome name={iconName} size={20} color={color} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

// Styles are defined within the component file for encapsulation
const styles = StyleSheet.create({
  button: {
    flex: 1, // This allows it to grow and fill space in a flex container
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default SocialButton;