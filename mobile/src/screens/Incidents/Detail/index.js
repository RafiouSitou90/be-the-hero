import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logo from '../../../assets/logo.png';

import styles from './styles';

export default function Detail() {
	const navigation = useNavigation();
	const route = useRoute();

	const incident = route.params.incident;
	const message = `Hello ${
		incident.name
	}, I'm in contact because I would like to help  in the case "${
		incident.title
	}" with the value ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
		incident.value
	)}.`;

	const _navigateBack = () => {
		navigation.goBack();
	};

	const _sendEmail = () => {
		MailComposer.composeAsync({
			subject: `Case hero: ${incident.title}`,
			recipients: [incident.email],
			body: message
		});
	};

	const _sendWhatsApp = () => {
		Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logo} />
				<TouchableOpacity style={styles.detailsButton} onPress={_navigateBack}>
					<Feather name='arrow-left' size={28} color='#e02041' />
				</TouchableOpacity>
			</View>

			<View style={styles.incident}>
				<Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
				<Text style={styles.incidentValue}>
					{incident.name} of {incident.city}/{incident.uf}
				</Text>

				<Text style={styles.incidentProperty}>CASE:</Text>
				<Text style={styles.incidentValue}>{incident.title}</Text>

				<Text style={styles.incidentProperty}>VALUE:</Text>
				<Text style={styles.incidentValue}>
					{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
						incident.value
					)}
				</Text>
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Save the day!</Text>
				<Text style={styles.heroTitle}>Be the hero of this case.</Text>

				<Text style={styles.heroDescription}>Contact</Text>

				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={_sendWhatsApp}>
						<Text style={styles.actionText}>WhatsApp</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.action} onPress={_sendEmail}>
						<Text style={styles.actionText}>E-mail</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
