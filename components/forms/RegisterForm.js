import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/apollo/queries';
import validator from 'validator';
import { useRouter } from 'next/router';

const RegisterForm = () => {
	const router = useRouter();

	const [formState, setFormState] = useState({
		avatar: '',
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});

	const [error, setError] = useState({
		avatarError: '',
		usernameError: '',
		emailError: '',
		passwordError: '',
		passwordConfirmationError: '',
	});

	const [registerUser, { data }] = useMutation(SIGN_UP, {
		variables: {
			avatar: formState.avatar,
			username: formState.username,
			email: formState.email,
			password: formState.password,
			passwordConfirmation: formState.passwordConfirmation,
		},
		onError: ({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.forEach(({ message }) => {
					if (message.includes('E11000')) {
						setError({ emailError: 'Email is already exist!' });
					}
					if (message.includes('invalid')) {
						setError({ emailError: 'Must be a valid email!' });
					}
				});
			if (networkError) console.log(`${networkError}`);
		},
	});

	useEffect(() => {
		if (data && data.signUp) {
			router.push('/login');
		}
	}, [data]);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				registerUser();
			}}
		>
			<div className="form-group">
				<label htmlFor="avatar">Avatar</label>
				<input
					onChange={e =>
						setFormState({
							...formState,
							avatar: e.target.value,
						})
					}
					type="text"
					className="form-control"
					name="avatar"
					id="avatar"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="username">Username*</label>
				<input
					onChange={e =>
						setFormState({
							...formState,
							username: e.target.value,
						})
					}
					type="text"
					className="form-control"
					name="username"
					id="username"
					onBlur={() => {
						if (formState.username == '') {
							setError({ usernameError: 'Username is Required!' });
						}
						if (formState.username.length < 6) {
							setError({
								usernameError: 'Username must be at least 6 character!',
							});
						} else {
							setError({ usernameError: '' });
						}
					}}
				/>
				<label style={{ color: 'red' }}>{error.usernameError}</label>
			</div>
			<div className="form-group">
				<label htmlFor="email">Email*</label>
				<input
					onChange={e =>
						setFormState({
							...formState,
							email: e.target.value,
						})
					}
					type="email"
					className="form-control"
					name="email"
					id="email"
					onBlur={() => {
						if (formState.email === '') {
							setError({ emailError: 'Email is required!' });
						} else if (!validator.isEmail(formState.email)) {
							setError({ emailError: 'Must be a valid email!' });
						} else {
							setError({ emailError: '' });
						}
					}}
				/>
				<label style={{ color: 'red' }}>{error.emailError}</label>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password*</label>
				<input
					onChange={e =>
						setFormState({
							...formState,
							password: e.target.value,
						})
					}
					type="password"
					autoComplete="false"
					className="form-control"
					name="password"
					id="password"
					onBlur={() => {
						if (formState.password == '') {
							setError({ passwordError: 'Password is required!' });
						} else if (formState.password.length < 6) {
							setError({
								passwordError: 'Password must be at least 6 character!',
							});
						} else if (formState.password !== formState.passwordConfirmation) {
							setError({
								passwordConfirmationError: 'Passwords must be match!',
							});
						} else {
							setError({ passwordError: '' });
						}
					}}
				/>
				<label style={{ color: 'red' }}>{error.passwordError}</label>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password Confirmation*</label>
				<input
					onChange={e =>
						setFormState({
							...formState,
							passwordConfirmation: e.target.value,
						})
					}
					type="password"
					autoComplete="false"
					className="form-control"
					name="passwordConfirmation"
					id="passwordConfirmation"
					onBlur={() => {
						if (formState.passwordConfirmation == '') {
							setError({
								passwordConfirmationError: 'Password confirmation is required!',
							});
						} else if (formState.password !== formState.passwordConfirmation) {
							setError({
								passwordConfirmationError: 'Passwords must be match!',
							});
						} else {
							setError({ passwordConfirmationError: '' });
						}
					}}
				/>
				<label style={{ color: 'red' }}>
					{error.passwordConfirmationError}
				</label>
			</div>
			<button
				disabled={
					formState.username === '' ||
					formState.username.length < 6 ||
					formState.email === '' ||
					formState.password === '' ||
					formState.password.length < 6 ||
					formState.passwordConfirmation === '' ||
					formState.passwordConfirmation.length < 6 ||
					(error.usernameError !== '' &&
						error.emailError !== '' &&
						error.passwordError !== '' &&
						error.passwordConfirmationError !== '' &&
						!validator.isEmail(formState.email) &&
						!validator.isEmail(error.emailError))
				}
				type="submit"
				className="btn btn-main bg-blue py-2 ttu"
			>
				Submit
			</button>
		</form>
	);
};

export default RegisterForm;
