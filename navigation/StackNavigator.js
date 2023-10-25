import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dash from '../screens/dashboard';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dash" options={{
      headerShown: false,
    }} >
         <Stack.Screen
        name="Dash"
        component={Dash}
        options={{
          headerShown: false,
        }}
      />
      
    
      
       
               
     

    </Stack.Navigator>
  );
};

export default StackNavigator;
