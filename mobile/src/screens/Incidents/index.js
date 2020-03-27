import React, { useState, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import logo from '../../assets/logo.png';
import api from '../../services/api';

import styles from './styles';

export default function Incidents() {
	const navigation = useNavigation();
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const _loadIncidents = async () => {
		if (isLoading) {
			return;
		}

		if (total > 0 && incidents.length === total) {
			return;
		}

		try {
			setIsLoading(true);
			const response = await api.get(`incidents?page=${page}`);
			setIncidents([...incidents, ...response.data.incidents]);
			setTotal(response.headers['x-total-count']);
			setPage(page + 1);
			setIsLoading(false);
		} catch (error) {
			Alert.alert('Error!!! Network problem', 'Please check your network and try again later');
		}
	};

	const _navigateToDetail = incident => {
		navigation.navigate('Detail', { incident });
	};

	useEffect(() => {
		_loadIncidents();
	}, []);

	return (
		// <SafeAreaView style={styles.container}>
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logo} />
				<Text style={styles.headerText}>
					Total of <Text style={styles.headerTextBold}>{total} cases</Text>.
				</Text>
			</View>

			<Text style={styles.title}>Welcome!</Text>
			<Text style={styles.description}>Choose one of the cases below and save the day</Text>

			<FlatList
				style={styles.incidentList}
				data={incidents}
				keyExtractor={incident => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={_loadIncidents}
				onEndReachedThreshold={0.2}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>ONG:</Text>
						<Text style={styles.incidentValue}>{incident.name}</Text>

						<Text style={styles.incidentProperty}>CASE:</Text>
						<Text style={styles.incidentValue}>{incident.title}</Text>

						<Text style={styles.incidentProperty}>VALUE:</Text>
						<Text style={styles.incidentValue}>
							{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
								incident.value
							)}
						</Text>

						<TouchableOpacity
							style={styles.detailsButton}
							onPress={() => _navigateToDetail(incident)}
						>
							<Text style={styles.detailsButtonText}>Show details</Text>
							<Feather name='arrow-right' size={18} color='#e02041' />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
		// </SafeAreaView>
	);
}
