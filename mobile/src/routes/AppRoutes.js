import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppStack = createStackNavigator();

import Incidents from '../screens/Incidents';
import Detail from '../screens/Incidents/Detail';

export default function AppRoutes() {
	return (
		// <SafeAreaProvider>
		<NavigationContainer>
			<AppStack.Navigator screenOptions={{ headerShown: false }}>
				<AppStack.Screen name='Incidents' component={Incidents} />
				<AppStack.Screen name='Detail' component={Detail} />
			</AppStack.Navigator>
		</NavigationContainer>
		//		</SafeAreaProvider>
	);
}
