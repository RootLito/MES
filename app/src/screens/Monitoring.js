import NetInfo from "@react-native-community/netinfo";
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
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Rating } from "react-native-ratings";

export default function Monitoring() {
  const [isConnected, setIsConnected] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [savedData, setSavedData] = useState([]);
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    try {
      const existingData = await AsyncStorage.getItem("formDataList");
      const parsedData = existingData ? JSON.parse(existingData) : [];

      const updatedData = [...parsedData, formData];

      await AsyncStorage.setItem("formDataList", JSON.stringify(updatedData));

      setSavedData(updatedData);

      Alert.alert("Success", "Data has been saved!");

      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Failed to save form data", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

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
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Civil Status</Text>
                  
                  <RNPickerSelect
                    onValueChange={(value) =>
                      console.log("Selected Civil Status:", value)
                    }
                    items={[
                      { label: "Single", value: "single" },
                      { label: "Married", value: "married" },
                      { label: "Divorced", value: "divorced" },
                      { label: "Widowed", value: "widowed" },
                    ]}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Sex</Text>
                  <RNPickerSelect
                    onValueChange={(value) =>
                      console.log("Selected Sex:", value)
                    }
                    items={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                </View>
              </View>

              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>No. of HH Member</Text>
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
                  <Text style={styles.label}>FishR</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={styles.label}>BoatR</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
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
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
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
                    placeholder="Enter your email"
                    keyboardType="email-address"
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
                <Text>- Is it sufficient/enough? (Quantity)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Quantity
                </Text>
                <Rating size={24} rating={rating} />
                <Text>- Is it new, has no defect or suitable? (quality)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Quality
                </Text>
                <Rating size={24} rating={rating} />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  2. Is it timely with the fishing/production/stocking season?
                </Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Timeliness
                </Text>

                <Rating size={24} rating={rating} />
                <Text>Is it upon request?</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
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
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text>- Please specify the needs and challenges</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Relevance
                </Text>
                <Rating size={24} rating={rating} />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  4. Was the project suitable for the local environment and
                  economic conditions?
                </Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
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
                    COHERENCE OF THE PROJECT
                  </Text>
                </View>

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  5. Were beneficiaries/stakeholders engaged and coordinated
                  throughout the project?
                </Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Coherence
                </Text>
                <Rating size={24} rating={rating} />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  6. Were there any complementarity or duplications with other
                  projects or initiatives?
                </Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
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
                    EFFECTIVENESS OF THE PROJECT
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  7. Satisfaction on the project received
                </Text>
                <Text>- Were you satisfied with the project given?</Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  Rating on Satisfaction
                </Text>
                <Rating size={24} rating={rating} />
                <Text>- Were you able to use it as soon as given?</Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />

                <Text style={{ fontWeight: "bold", marginTop: 12 }}>
                  8. Were there problems encountered during project operation?
                </Text>
                <Text>Yes or No</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
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
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#e0e0e0",
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
