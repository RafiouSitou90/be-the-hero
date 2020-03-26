import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');

	const _handleRegister = async e => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('The password is not equal. Please confirm your password');
		} else {
			const data = {
				name,
				password,
				email,
				whatsapp,
				city,
				uf
			};

			try {
				const response = await api.post('ongs', data, {
					method: 'POST'
				});

				alert(`Your access ID: ${response.data.id}`);
			} catch (error) {
				alert('Ops!!! Some error occurred. Please try again');
			}
		}
	};

	return (
		<div className='register-container'>
			<div className='content'>
				<section>
					<img src={logo} alt='Be The Hero' />

					<h1>Registration</h1>
					<p>
						Make your registration, enter the platform and help people find the cases of your ONG
					</p>
					<Link className='back-link' to='/' title='Login'>
						<FiArrowLeft size={24} color='#e02041' /> You already have an account?
					</Link>
				</section>
				<form onSubmit={_handleRegister}>
					<input
						placeholder='Name of the ONG'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<input
						type='email'
						placeholder='email@example.com'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<div className='input-group'>
						<input
							type='password'
							placeholder='Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<input
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
					</div>
					<input
						placeholder='Whatsapp'
						value={whatsapp}
						onChange={e => setWhatsapp(e.target.value)}
					/>
					<div className='input-group'>
						<input placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
						<input
							placeholder='UF'
							style={{ width: 80 }}
							value={uf}
							onChange={e => setUf(e.target.value)}
						/>
					</div>
					<button className='button' type='submit' title='Register'>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
