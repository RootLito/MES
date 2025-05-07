import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Rating } from "react-native-ratings";
import NetInfo from "@react-native-community/netinfo";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import {
  initStorage,
  saveDocument,
  readAllDocuments,
} from "../utils/fileStorage";

export default function Monitoring() {
  const [isConnected, setIsConnected] = useState(null);
  const [savedData, setSavedData] = useState([]);
  const [rating, setRating] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    form: {
      name: "",
      resType: "",
      civilStatus: "",
      sex: "",
      age: "",
      hhMember: "",
      fishR: "",
      boatR: "",
      nameAssoc: "",
      totalMember: "",
      province: "",
      municipality: "",
      baranggay: "",
      projectReceived: "",
      scale: "",
      specProject: "",
      specRemarks: "",
      specOther: "",
      noUnitsReceived: "",
      dateReceived: "",
      mainIncome: "",
      otherIncome: "",
      lat: "",
      lon: "",
      quantity: "",
      quantityReason: "",
      quantityRating: "",
      quality: "",
      qualityReason: "",
      qualityRating: "",
      q2: "",
      q2Reason: "",
      timelinessRating: "",
      uponRequest: "",
      duration: "",
      q3: "",
      q3Reason: "",
      challenges: "",
      relevanceRating: "",
      q4: "",
      q4Reason: "",
      q5: "",
      q5Reason: "",
      coherenceRating: "",
      q6: "",
      q6Reason: "",
      q7Satisfied: "",
      q7_1: "",
      satisfactionRating: "",
      q7_2: "",
      q7_2Reason: "",
      q8: "",
      q8Reason: "",
      q9_1: "",
      q9_1Spec: "",
      q9_2: "",
      q9_3: "",
      q9_4: "",
      q9_5: "",
      q9_6: "",
      q9_7: "",
      q9_8: "",
      q9_9: "",
      q9_10: "",
      q10_e: "",
      q9_11: [],
      q9_11other: "",
      q9_12: "",
      q9_12Spec: "",
      q9_13: "",
      q9_13other: "",
      q9_14: "",
      impactRating: "",
      q10: "",
      q10Reason: "",
      q10_1: "",
      sustainabilityRating: "",
      q11: "",
      q11_1: "",
      q11_1spec: "",
      q12: "",
      note: "",
      evaluator: "",
    },
  });

  const capture = [
    "shallow water payao",
    "lambaklad",
    "hook and line",
    "tuna handline",
    "multiple handline",
    "net gears",
    "motorized boat",
    "non-motorized boat",
    "marine engine",
    "fry dozer",
    "others",
  ];

  const aquaculture = [
    "freshwater tilapia fingerlings",
    "saline tilapia fingerlings",
    "milkfish fingerlings",
    "hito fingerlings",
    "post-larvae shrimp",
    "kitang fingerlings",
    "mudcrabs",
    "tilapia fingerlings for broodstock development",
    "tilapia broodstock",
    "milkfish broodstock",
    "seaweed propagules",
    "seaweed farm implements",
    "seaweed nurseries",
    "feeds",
    "fertilizer",
    "others",
  ];

  const postHarvest = [
    "freezer",
    "dryer",
    "fish stalls",
    "smokehouse",
    "vacuum sealer/packer",
    "sorter",
    "fish deboning set",
    "fish bottling set",
    "processing utensils",
    "fish cart/kiosk",
    "salt",
    "others",
  ];

  const technoDemo = [
    "Shellfish",
    "Polyculture of Milkfish and Molobicus Tilapia",
    "Monoculture of Milkfish",
    "others",
  ];

  const handleChange = (name, value, type = "text", checked = false) => {
    setFormData((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]:
          type === "checkbox"
            ? checked
              ? [...(prevState.form[name] || []), value]
              : (prevState.form[name] || []).filter((item) => item !== value)
            : value,
      },
    }));
  };

  //   EXPO FILE SYSTEM
  useEffect(() => {
    initStorage();
  }, []);
  //   const handleSubmit = async () => {
  //     try {
  //       // Save new form data to file
  //       await saveDocument(formData);

  //       // Read all saved data from the file
  //       const updatedData = await readAllDocuments();
  //       setSavedData(updatedData);

  //       Alert.alert('Success', 'Data has been saved!');

  //       // Clear the form after submission
  //       setFormData({ name: '', email: '' });
  //     } catch (error) {
  //       console.error('Failed to save form data', error);
  //       Alert.alert('Error', 'Failed to save data.');
  //     }
  //   };
  const handleSubmit = async () => {
    console.log("Form data to be saved:", formData);
  };
  //   PARA SA WIFI CONNECTIVITY
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.actionBar}>
        <Text style={styles.text}>MONITORING</Text>
        <View style={styles.wifi}>
          <Icon
            name={isConnected ? "wifi" : "wifi-off"}
            size={14}
            color={isConnected ? "#54cf95" : "red"}
          />
          <Text
            style={[
              styles.textStatus,
              { color: isConnected ? "#54cf95" : "red" },
            ]}
          >
            {isConnected === null
              ? "Checking connection..."
              : isConnected
              ? "Online"
              : "Offline"}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={{ flex: 1 }}>
          <ProgressSteps
            activeStepIconBorderColor="#54cf95"
            completedProgressBarColor="#54cf95"
            activeStepIconColor="transparent"
            completedStepIconColor="#54cf95"
          >
            <ProgressStep
              label="BENEFICIARY INFO"
              buttonFillColor="#54cf95"
              buttonNextTextColor="#FFFFFF"
              progressBarColor="#54cf95"
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#182553",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  BENEFICIARY INFORMATION
                </Text>
              </View>

              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.form.name}
                onChangeText={(text) => handleChange("name", text)}
                placeholder="Last Name, First Name, Middle Initial"
              />

              <Text style={styles.label}>Respondent Type</Text>

              <View
                style={{
                  height: 48,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  backgroundColor: "#e0e0e0",
                  borderRadius: 8,
                  justifyContent: "center",
                }}
              >
                <RNPickerSelect
                  onValueChange={(value) => handleChange("resType", value)}
                  value={formData.form.resType}
                  items={[
                    { label: "Individual", value: "Individual" },
                    { label: "Group", value: "Group" },
                    { label: "LGU", value: "LGU" },
                  ]}
                />
              </View>

              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Civil Status</Text>

                  <View
                    style={{
                      height: 48,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#e0e0e0",
                      borderRadius: 8,
                      justifyContent: "center",
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={(value) =>
                        handleChange("civilStatus", value)
                      }
                      value={formData.form.civilStatus}
                      items={[
                        { label: "Single", value: "single" },
                        { label: "Married", value: "married" },
                        { label: "Divorced", value: "divorced" },
                        { label: "Widowed", value: "widowed" },
                      ]}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Sex</Text>

                  <View
                    style={{
                      height: 48,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#e0e0e0",
                      borderRadius: 8,
                      justifyContent: "center",
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={(value) => handleChange("sex", value)}
                      value={formData.form.sex}
                      items={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(value) => handleChange("age", value)}
                    value={formData.form.age}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>No. of HH Member</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(value) => handleChange("hhMember", value)}
                    value={formData.hhMember}
                  />
                </View>
              </View>

              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>FishR</Text>
                  <View
                    style={{
                      height: 48,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#e0e0e0",
                      borderRadius: 8,
                      justifyContent: "center",
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={(value) => handleChange("fishR", value)}
                      value={formData.form.fishR}
                      items={[
                        { label: "Registered", value: "Registered" },
                        { label: "LGU Registered", value: "LGU Registered" },
                        {
                          label: "For Registration",
                          value: "For Registration",
                        },
                        {
                          label: "For Verification",
                          value: "For Verification",
                        },
                      ]}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>BoatR</Text>
                  <View
                    style={{
                      height: 48,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#e0e0e0",
                      borderRadius: 8,
                      justifyContent: "center",
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={(value) => handleChange("boatR", value)}
                      value={formData.form.boatR}
                      items={[
                        { label: "Registered", value: "Registered" },
                        { label: "LGU Registered", value: "LGU Registered" },
                        {
                          label: "For Registration",
                          value: "For Registration",
                        },
                        { label: "N/A", value: "N/A" },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.label}>Name of Association</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <Text style={styles.label}>Total No. of Memebers</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <Text style={styles.label}>Province</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <Text style={styles.label}>Municipality</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <Text style={styles.label}>Baranggay</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <Text style={styles.label}>Project Received</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <Text style={styles.label}>Specific Project</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>No. of Units Received</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.form.dateReceived}
                    onChangeText={(text) => handleChange("dateReceived", text)}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Date Received</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
              </View>

              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Main Source if Income</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Other Source of Income</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
              </View>

              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Latitude</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Longitude</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
              </View>
            </ProgressStep>

            {/* ACTUAL FORM  */}
            <ProgressStep
              label="SURVEY FORM"
              buttonFillColor="#54cf95"
              buttonNextTextColor="#FFFFFF"
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#182553",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  EFFICIENCY OF THE PROJECT
                </Text>
              </View>
              <View style={{}}>
                <Text style={{ fontWeight: "bold" }}>
                  1. Quantity and quality of goods/project received
                </Text>
                <Text style={{ marginTop: 10 }}>
                  - Is it sufficient/enough? (Quantity)
                </Text>

                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginLeft: 10 }}
                  value={formData.form.quantity}
                  onSelected={(value) => handleChange("quantity", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="sufficient"
                    label=" Yes"
                    style={
                      formData.form.quantity === "sufficient"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />

                  <RadioButtonItem
                    value="not sufficient"
                    label=" No"
                    style={
                      formData.form.quantity === "not sufficient"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.quantity === "not sufficient" && (
                  <>
                    <TextInput
                      placeholder="If no, why?"
                      style={[
                        styles.input,
                        formData.form.quantityReason.trim() === "" &&
                          formData.form.quantity !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.quantityReason}
                      onChangeText={(text) =>
                        handleChange("quantityReason", text)
                      }
                    />
                    {formData.form.quantityReason.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Quantity
                </Text>
                <RNPickerSelect
                  onValueChange={(value) =>
                    handleChange("quantityRating", value)
                  }
                  value={formData.form.quantityRating}
                  items={[
                    { label: "⭐⭐⭐⭐⭐", value: 5 },
                    { label: "⭐⭐⭐⭐", value: 4 },
                    { label: "⭐⭐⭐", value: 3 },
                    { label: "⭐⭐", value: 2 },
                    { label: "⭐", value: 1 },
                  ]}
                />

                <Text>- Is it new, has no defect or suitable? (quality)</Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10 }}
                  value={formData.form.quality}
                  onSelected={(value) => handleChange("quality", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="no defects"
                    label=" Yes"
                    style={
                      formData.form.quality === "no defects"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="has defects"
                    label=" No"
                    style={
                      formData.form.quality === "has defects"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.quality === "has defects" && (
                  <>
                    <Text>
                      - Is it new, has no defect or suitable? (quality)
                    </Text>
                    <TextInput
                      placeholder="If no, why?"
                      style={[
                        styles.input,
                        formData.form.qualityReason.trim() === "" &&
                          formData.form.quality !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.qualityReason}
                      onChangeText={(text) =>
                        handleChange("qualityReason", text)
                      }
                    />
                    {formData.form.qualityReason.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Quality
                </Text>
                <RNPickerSelect
                  onValueChange={(value) =>
                    handleChange("qualityRating", value)
                  }
                  value={formData.form.qualityRating}
                  items={[
                    { label: "⭐⭐⭐⭐⭐", value: 5 },
                    { label: "⭐⭐⭐⭐", value: 4 },
                    { label: "⭐⭐⭐", value: 3 },
                    { label: "⭐⭐", value: 2 },
                    { label: "⭐", value: 1 },
                  ]}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  2. Is it timely with the fishing/production/stocking season?
                </Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10 }}
                  value={formData.form.q2}
                  onSelected={(value) => handleChange("q2", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="Yes"
                    label=" Yes"
                    style={
                      formData.form.q2 === "Yes"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="No"
                    label=" No"
                    style={
                      formData.form.q2 === "No"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q2 === "No" && (
                  <>
                    <TextInput
                      placeholder="If no, why?"
                      style={[
                        styles.input,
                        formData.form.q2Reason.trim() === "" &&
                          formData.form.q2 !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q2Reason}
                      onChangeText={(text) => handleChange("q2Reason", text)}
                    />
                    {formData.form.q2Reason.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Timeliness
                </Text>
                <RNPickerSelect
                  onValueChange={(value) =>
                    handleChange("timelinessRating", value)
                  }
                  value={formData.form.timelinessRating}
                  items={[
                    { label: "⭐⭐⭐⭐⭐", value: 5 },
                    { label: "⭐⭐⭐⭐", value: 4 },
                    { label: "⭐⭐⭐", value: 3 },
                    { label: "⭐⭐", value: 2 },
                    { label: "⭐", value: 1 },
                  ]}
                />

                <Text>Is it upon request?</Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10 }}
                  value={formData.form.uponRequest}
                  onSelected={(value) => handleChange("uponRequest", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="provided upon request"
                    label=" Yes"
                    style={
                      formData.form.uponRequest === "provided upon request"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="not provided upon request"
                    label=" No"
                    style={
                      formData.form.uponRequest === "not provided upon request"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>

                <Text>Duration</Text>
                <RNPickerSelect
                  onValueChange={(value) => handleChange("duration", value)}
                  value={formData.form.duration}
                  items={[
                    { label: "< 6 months", value: "<6 months" },
                    { label: "< 1 year", value: "<1 year" },
                    { label: "> 1 year", value: ">1 year" },
                  ]}
                />

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#182553",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    RELEVANCE OF THE PROJECT
                  </Text>
                </View>

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  3. Did the project address your key needs and challenges?
                </Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10 }}
                  value={formData.form.q3}
                  onSelected={(value) => handleChange("q3", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="addressed the need"
                    label=" Yes"
                    style={
                      formData.form.q3 === "addressed the need"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="did not addressed the need"
                    label=" No"
                    style={
                      formData.form.q3 === "did not addressed the need"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q3 === "did not addressed the need" && (
                  <>
                    <TextInput
                      placeholder="If no, why?"
                      style={[
                        styles.input,
                        formData.form.q3Reason.trim() === "" &&
                          formData.form.q3 !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q3Reason}
                      onChangeText={(text) => handleChange("q3Reason", text)}
                    />
                    {formData.form.q3Reason.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <Text>- Please specify the needs and challenges</Text>
                <TextInput
                placeholder="Optional"
                  style={styles.input}
                  value={formData.form.challenges}
                  onChangeText={(text) => handleChange("challenges", text)}
                />


                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Relevance
                </Text>
                <RNPickerSelect
                  onValueChange={(value) =>
                    handleChange("relevanceRating", value)
                  }
                  value={formData.form.relevanceRating}
                  items={[
                    { label: "⭐⭐⭐⭐⭐", value: 5 },
                    { label: "⭐⭐⭐⭐", value: 4 },
                    { label: "⭐⭐⭐", value: 3 },
                    { label: "⭐⭐", value: 2 },
                    { label: "⭐", value: 1 },
                  ]}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  4. Was the project suitable for the local environment and
                  economic conditions?
                </Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', gap: 20 }}
                  value={formData.form.q4}
                  onSelected={(value) => handleChange("q4", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="suitable for the area"
                    label=" Yes"
                    style={
                      formData.form.q4 === "suitable for the area"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="not suitable for the area"
                    label=" No"
                    style={
                      formData.form.q4 === "not suitable for the area"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q4 === "not suitable for the area" && (
                  <>
                    <TextInput
                      placeholder="If no, why?"
                      style={[
                        styles.input,
                        formData.form.q4Reason.trim() === "" &&
                          formData.form.q4 !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q4Reason}
                      onChangeText={(text) => handleChange("q4Reason", text)}
                    />
                    {formData.form.q4Reason.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}



                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#182553",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    COHERENCE OF THE PROJECT
                  </Text>
                </View>

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  5. Were beneficiaries/stakeholders engaged and coordinated
                  throughout the project?
                </Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', gap: 20 }}
                  value={formData.form.q5}
                  onSelected={(value) => handleChange("q5", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="well-aware of the type of project given"
                    label=" Yes"
                    style={
                      formData.form.q5 === "well-aware of the type of project given"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="not aware of the type of project given"
                    label=" No"
                    style={
                      formData.form.q5 === "not aware of the type of project given"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q5 === "not aware of the type of project given" && (
                  <>
                    <TextInput
                      placeholder="If no, why?"
                      style={[
                        styles.input,
                        formData.form.q5Reason.trim() === "" &&
                          formData.form.q5 !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q5Reason}
                      onChangeText={(text) => handleChange("q5Reason", text)}
                    />
                    {formData.form.q5Reason.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Coherence
                </Text>
                <RNPickerSelect
                  onValueChange={(value) =>
                    handleChange("coherenceRating", value)
                  }
                  value={formData.form.coherenceRating}
                  items={[
                    { label: "⭐⭐⭐⭐⭐", value: 5 },
                    { label: "⭐⭐⭐⭐", value: 4 },
                    { label: "⭐⭐⭐", value: 3 },
                    { label: "⭐⭐", value: 2 },
                    { label: "⭐", value: 1 },
                  ]}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  6. Were there any complementarity or duplications with other
                  projects or initiatives?
                </Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', gap: 20 }}
                  value={formData.form.q6}
                  onSelected={(value) => handleChange("q6", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="Yes"
                    label=" Yes"
                    style={
                      formData.form.q6 === "Yes"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="none"
                    label=" No"
                    style={
                      formData.form.q6 === "none"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q6 === "Yes" && (
                  <>
                    <TextInput
                      placeholder="If Yes, pls specify project from other NGA/NGO"
                      style={[
                        styles.input,
                        formData.form.q6Reason.trim() === "" &&
                          formData.form.q6 !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q6Reason}
                      onChangeText={(text) => handleChange("q6Reason", text)}
                    />
                    {formData.form.q6Reason.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#182553",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    EFFECTIVENESS OF THE PROJECT
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  7. Satisfaction on the project received
                </Text>
                <Text>- Were you satisfied with the project given?</Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', gap: 20 }}
                  value={formData.form.q7Satisfied}
                  onSelected={(value) => handleChange("q7Satisfied", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="satisfied by the project"
                    label=" Yes"
                    style={
                      formData.form.q7Satisfied === "satisfied by the project"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="not satisfied by the project"
                    label=" No"
                    style={
                      formData.form.q7Satisfied === "not satisfied by the project"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q7Satisfied === "not satisfied by the project" && (
                  <>
                    <TextInput
                      placeholder="If no, why?"
                      style={[
                        styles.input,
                        formData.form.q7_1.trim() === "" &&
                          formData.form.q7Satisfied !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q7_1}
                      onChangeText={(text) => handleChange("q7_1", text)}
                    />
                    {formData.form.q7_1.trim() === "" &&
                      formData.form.quantity !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}



                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Satisfaction
                </Text>
                <RNPickerSelect
                  onValueChange={(value) =>
                    handleChange("satisfactionRating", value)
                  }
                  value={formData.form.satisfactionRating}
                  items={[
                    { label: "⭐⭐⭐⭐⭐", value: 5 },
                    { label: "⭐⭐⭐⭐", value: 4 },
                    { label: "⭐⭐⭐", value: 3 },
                    { label: "⭐⭐", value: 2 },
                    { label: "⭐", value: 1 },
                  ]}
                />




                <Text>- Were you able to use it as soon as given?</Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', gap: 20 }}
                  value={formData.form.q7_2}
                  onSelected={(value) => handleChange("q7_2", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="Yes"
                    label=" Yes"
                    style={
                      formData.form.q7_2 === "Yes"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="No"
                    label=" No"
                    style={
                      formData.form.q7_2 === "No"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q7_2 === "No" && (
                  <>
                    <TextInput
                      placeholder="If No, please specify"
                      style={[
                        styles.input,
                        formData.form.q7_2Reason.trim() === "" &&
                          formData.form.q7_2 !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q7_2Reason}
                      onChangeText={(text) => handleChange("q7_2Reason", text)}
                    />
                    {formData.form.q7_2Reason.trim() === "" &&
                      formData.form.q7_2 !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  8. Were there problems encountered during project operation?
                </Text>
                <RadioButtonGroup
                  size={16}
                  containerStyle={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', gap: 20 }}
                  value={formData.form.q8}
                  onSelected={(value) => handleChange("q8", value)}
                  radioBackground="green"
                >
                  <RadioButtonItem
                    value="Yes"
                    label=" Yes"
                    style={
                      formData.form.q8 === "Yes"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                  <RadioButtonItem
                    value="none"
                    label=" No"
                    style={
                      formData.form.q8 === "none"
                        ? { borderColor: "#54cf95", backgroundColor: "#54cf95" }
                        : {}
                    }
                  />
                </RadioButtonGroup>
                {formData.form.q8 === "Yes" && (
                  <>
                    <TextInput
                      placeholder="If yes, please specify"
                      style={[
                        styles.input,
                        formData.form.q8Reason.trim() === "" &&
                          formData.form.q8 !== "" && {
                            borderColor: "red",
                          },
                      ]}
                      value={formData.form.q8Reason}
                      onChangeText={(text) => handleChange("q8Reason", text)}
                    />
                    {formData.form.q8Reason.trim() === "" &&
                      formData.form.q8 !== "" && (
                        <Text style={{ color: "red" }}>
                          This field is required!
                        </Text>
                      )}
                  </>
                )}

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#182553",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    IMPACT OF THE PROJECT
                  </Text>
                </View>

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  9. Benefits from the project
                </Text>
                <Text>- Did it increase your catch/production (kg)?</Text>
                <Text>Yes</Text>
                <Text>No</Text>
                <Text>N/A</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ marginTop: 12 }}>
                  - Catch/yield before project was given
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ marginTop: 12 }}>
                  - Catch/yield after project was given
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ marginTop: 12 }}>
                  - Contribution to Production
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ marginTop: 12 }}>
                  Aquaculture (culture period, survival rate, no. of pcs/kilo)
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ marginTop: 12 }}>
                  Capture (catch/day, no. of fishing operations- day/month)
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text>- Did it increase your income (Php)?</Text>
                <Text>Yes</Text>
                <Text>No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ marginTop: 12 }}>
                  - Income before project was given (net/operation)
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ marginTop: 12 }}>
                  - Income after project was given (net/operation)
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text>- Any improvement in your family/household?</Text>
                <Text>Yes</Text>
                <Text>No</Text>

                <Text>Consumption</Text>
                <Text>Education</Text>
                <Text>Other HH needs</Text>

                <Text>- Any improvement in your association?</Text>
                <Text>Yes</Text>
                <Text>No</Text>

                <Text>Improved Skills/Knowledge</Text>
                <Text>From Association to Coop</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text>- Any improvement in the community?</Text>
                <Text>Yes</Text>
                <Text>No</Text>
                <Text>N/A</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Impact
                </Text>
                <Rating size={24} rating={rating} />

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#182553",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    SUSTAINABILITY OF THE PROJECT
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  10. Is the project ongoing/operational/used?
                </Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text>If yes, how long did the project last?</Text>
                <Text>&lt; 3 months</Text>
                <Text>&lt; 1 year</Text>
                <Text>&gt; 1 year</Text>

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Sustainability
                </Text>
                <Rating size={24} rating={rating} />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  11. Availability of market for the produce (fresh or
                  processed)?
                </Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text>Please Specify</Text>
                <Text>Vending</Text>
                <Text>Local Martket</Text>
                <Text>Trader/Consignee</Text>
              </View>
            </ProgressStep>

            <ProgressStep
              label="NEEDS ASSESSMENT"
              buttonFillColor="#54cf95"
              buttonNextTextColor="#FFFFFF"
              onSubmit={handleSubmit}
            >
              <View style={{}}>
                <Text style={{ fontWeight: "bold" }}>
                  12. How else can the government through BFAR help or assist
                  you?
                </Text>
                <Text>
                  (credit facilitation, training, livelihood assistance, others,
                  please specify)
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Evaluator's Note (cite practices, success stories and other
                  observations):
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  actionBar: {
    width: "100%",
    height: Platform.OS === "ios" ? 44 : 56,
    backgroundColor: "#182553",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textStatus: {
    fontSize: 14,
  },
  wifi: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  label: {
    marginTop: 14,
    marginBottom: 4,
    fontSize: 13,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    backgroundColor: "#e3e3e3",
    borderRadius: 8,
  },

  picker: {
    fontSize: 12,
  },

  btn: {
    height: 48,
    backgroundColor: "#182553",
    borderRadius: 8,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    color: "white",
    marginBottom: 24,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginVertical: 10,
  },
});
