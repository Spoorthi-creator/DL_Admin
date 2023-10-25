import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Logout from '../screens/Logout';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator  drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#5e17eb',
      drawerActiveTintColor: "white",
      drawerInactiveTintColor: "black",
      drawerLabelStyle: {
        fontSize: 17,
      },}}>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          headerShown: false,
        }}
      />
    
     
      

       <Drawer.Screen
        name="Logout"
        component={Logout}
       
      />

    </Drawer.Navigator>

    
  );
};
// const HSStack = createStackNavigator();
// function HomeStack() {
//   return (
//     <HSStack.Navigator screenOptions={{ headerShown: false }}>
//      <HSStack.Screen name="Dash" component={Dash} />
//      <HSStack.Screen name="Cat" component={Cho1} />
//      <HSStack.Screen name="BookDetail" component={BookDetail} options={{
//       headerShown: false,
//     }} />
//      <HSStack.Screen name="Cart" component={Cart} options={{
//       headerShown: false,
//     }} />
//     </HSStack.Navigator>
//   );
// }

export default DrawerNavigator;
  



