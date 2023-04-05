import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import IconButton from "./models/IconButton";
import ClassModal from "./components/classComponents/ClassModal";
import ClassCreated from "./components/classComponents/ClassCreated";
import ClassJoined from "./components/classComponents/ClassJoined";
import AttendanceCreate from "./components/attendanceComponents/AttendanceCreate";
import AttendanceJoin from "./components/attendanceComponents/AttendanceJoin";
import ForgotPassModal from "./models/ForgotPassModal";

// View -> UI View(IOS), AndroidView(Android)
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

let Email = "";

function Class({ route }) {
  const { email } = route.params;
  Email = email;

  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: "#5499C7" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#5499C7" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
      })}
    >
      <BottomTabs.Screen
        name="ClassCreated"
        component={ClassCreated}
        options={{
          title: "Created Classes",
          tabBarLabel: "Created Class",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ClassJoined"
        component={ClassJoined}
        options={{
          title: "Joined Classes",
          tabBarLabel: "Joined Classes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar style="dark"></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#705DE0",
            },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#705DE0" },
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="AttendanceCreate" component={AttendanceCreate} />
          <Stack.Screen name="AttendanceJoin" component={AttendanceJoin} />
          <Stack.Screen name="Create/Join Class" component={ClassModal} />
          {/* <Stack.Screen name="Forgot" component={ForgotPassModal} /> */}
          <Stack.Screen
            name="Class"
            component={Class}
            options={({ navigation }) => ({
              headerBackVisible: false,

              headerRight: ({ tintColor }) => (
                <>
                  <IconButton
                    icon="add-circle-sharp"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      console.log(Email);
                      navigation.navigate("Create/Join Class", {
                        decision: "Create",
                        globalEmail: Email,
                      });
                    }}
                  />
                  <IconButton
                    icon="person-add-sharp"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      navigation.navigate("Create/Join Class", {
                        decision: "Join",
                        globalEmail: Email,
                      });
                    }}
                  />
                  <IconButton
                    icon="log-out"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  />
                </>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
