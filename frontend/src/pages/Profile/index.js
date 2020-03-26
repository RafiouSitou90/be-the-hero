import React, { useState, useEffect } from 'react';

import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './styles.css';

export default function Profile() {
	const ongId = localStorage.getItem('ongId');
	const ongName = localStorage.getItem('ongName');
	const [incidents, setIncidents] = useState([]);
	const history = useHistory();

	useEffect(() => {
		api
			.get('profile', {
				headers: {
					Authorization: ongId
				}
			})
			.then(response => {
				setIncidents(response.data.incidents);
			});
	}, [ongId]);

	const _handleDeleteIncident = async id => {
		try {
			await api.delete(`incidents/delete/${id}`, {
				headers: {
					Authorization: ongId
				}
			});

			setIncidents(incidents.filter(incident => incident.id !== id));
		} catch (error) {
			alert('Ops!!! Some error occurred. Please try again');
		}
	};

	const _handleLogOut = () => {
		localStorage.clear();

		history.push('/');
	};

	return (
		<div className='profile-container'>
			<header>
				<img src={logo} alt='Be The Hero' />
				<span>Welcome, {ongName.toUpperCase()}</span>
				<Link className='button' to='/incidents/new' title='Create new case'>
					Create new case
				</Link>
				<button type='button' onClick={_handleLogOut} title='LogOut'>
					<FiPower size={24} color='#e02041' />
				</button>
			</header>

			<h1>Registered cases</h1>

			<ul>
				{incidents.map(incident => (
					<li key={incident.id} className='inline-card-'>
						<strong>CASE:</strong>
						<p>{incident.title}</p>

						<strong>DESCRIPTION:</strong>
						<p>{incident.description}</p>

						<strong>VALUE:</strong>
						<p>
							{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
								incident.value
							)}
						</p>

						<strong>CREATED AT:</strong>
						<p>{incident.created_at}</p>

						<div>
							<button
								style={{ marginRight: '20px' }}
								type='button'
								onClick={() => _handleDeleteIncident(incident.id)}
								title='Edit'
							>
								<FiEdit size={20} color='#a8a8b3' />
							</button>

							<button
								type='button'
								onClick={() => _handleDeleteIncident(incident.id)}
								title='Delete'
							>
								<FiTrash2 size={20} color='#a8a8b3' />
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
