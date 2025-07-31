import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  AuthLoading: undefined;
  LoginScreen: undefined;
  SignUp: undefined;
  HomeScreen: undefined;
  Homecleaning: undefined;
  ToiletCleaning: undefined;
  Massage: undefined;
  HireMaid: undefined;
  LocationScreen: undefined;
  OrderScreen: undefined;
  AccountScreen: undefined;
  BottomTab: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>
