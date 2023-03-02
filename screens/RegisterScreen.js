import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Firebase
import { auth } from "../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// Helpers
import Screen from "../helpers/Screen";

const RegisterScreen = () => {};

export default RegisterScreen;
