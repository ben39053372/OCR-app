import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "./screen/Home";
import { AllResult } from "./screen/AllResult";
import { Result } from "./screen/Result";
import { Upload } from "./screen/Upload";

import { MaterialIcons } from "@expo/vector-icons";
import { ThemeProvider } from '@ben39053372/expo-theme'


const Tab = createBottomTabNavigator();

export enum Route {
  Home = "Home",
  AllResult = "AllResult",
  Result = "Result",
  Upload = "Upload",
}

const TabBarIcon = ({
  color,
  size,
  route,
}: {
  route: RouteProp<Record<string, object | undefined>, string>;
  navigation: any;
} & {
  focused: boolean;
  color: string;
  size: number;
}) => {
  switch (route.name as Route) {
    case Route.Home:
      return <MaterialIcons name="home" size={size} color={color} />;
    case Route.AllResult:
      return <MaterialIcons name="list" size={size} color={color} />;
    case Route.Result:
      return (
        <MaterialIcons name="photo-camera-back" size={size} color={color} />
      );
    case Route.Upload:
      return <MaterialIcons name="file-upload" size={size} color={color} />;
  }
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={Route.Home}
          screenOptions={(screenProps) => ({
            tabBarIcon: (tabBarprops) =>
              TabBarIcon({ ...tabBarprops, ...screenProps }),
          })}
        >
          <Tab.Screen name={Route.Home} component={Home} />
          <Tab.Screen name={Route.Upload} component={Upload} />
          <Tab.Screen name={Route.AllResult} component={AllResult} />
          <Tab.Screen name={Route.Result} component={Result} options={{ tabBarButton: () => null }} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
