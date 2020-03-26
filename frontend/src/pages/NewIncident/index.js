import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');
	const history = useHistory();

	const ongId = localStorage.getItem('ongId');

	const _handleNewIncident = async e => {
		e.preventDefault();

		const data = {
			title,
			description,
			value
		};

		try {
			await api.post('incidents', data, {
				headers: {
					Authorization: ongId
				}
			});

			history.push('/profile');
		} catch (error) {
			alert('Ops!!! Some error occurred. Please try again');
		}
	};

	return (
		<div className='new-incident-container'>
			<div className='content'>
				<section>
					<img src={logo} alt='Be The Hero' />

					<h1>Register new case</h1>
					<p>Describe the case in detail to find a hero to solve this.</p>
					<Link className='back-link' to='/profile' title='Back to home'>
						<FiArrowLeft size={24} color='#e02041' /> Back to home
					</Link>
				</section>
				<form onSubmit={_handleNewIncident}>
					<input placeholder='Case title' value={title} onChange={e => setTitle(e.target.value)} />
					<textarea
						placeholder='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<input
						placeholder='Value in reais'
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<button className='button' type='submit' title='Register'>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
