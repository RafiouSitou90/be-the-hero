import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const _handleLogin = async e => {
		e.preventDefault();

		try {
			const response = await api.post('auth/login', { id, password });

			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', response.data.ong.name);

			history.push('/profile');
		} catch (error) {
			alert('Ops!!! ID or password incorrect.');
		}
	};

	return (
		<div className='login-container'>
			<section className='form'>
				<img id='logo' src={logo} alt='Be The Hero' />

				<form onSubmit={_handleLogin}>
					<h1>Log In</h1>
					<input placeholder='Your ID' value={id} onChange={e => setId(e.target.value)} required />
					<input
						type='password'
						placeholder='Your password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
					<button className='button' type='submit' title='Login'>
						Login
					</button>
					<Link className='back-link' to='/register' title='Create an account'>
						<FiLogIn size={24} color='#e02041' /> You do not have an account?
					</Link>
				</form>
			</section>

			<img id='img_heroes' src={heroesImg} alt='Heroes' />
		</div>
	);
}
