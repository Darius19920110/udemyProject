import { useState, useEffect } from 'react';
import { userSignIn } from '@/apollo/actions';
import { useRouter } from 'next/router';

const LoginForm = () => {
	const router = useRouter();

	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});

	const [signIn, { data, loading, error }] = userSignIn(
		formState.email,
		formState.password
	);
	const errorMessage = error => {
		return (
			(error.graphQLErrors && error.graphQLErrors[0].message) ||
			'Oooops something went wrong...'
		);
	};

	useEffect(() => {
		if (data && data.signIn) {
			router.push('/');
		}
	}, [data]);

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					signIn({
						variables: { email: formState.email, password: formState.password },
					});
				}}
			>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						onChange={e =>
							setFormState({ ...formState, email: e.target.value })
						}
						type="email"
						name="email"
						className="form-control"
						id="email"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						onChange={e =>
							setFormState({ ...formState, password: e.target.value })
						}
						type="password"
						name="password"
						autoComplete="false"
						className="form-control"
						id="password"
					/>
				</div>
				{loading && 'Signing in...'}
				{!loading && (
					<button type="submit" className="btn btn-main bg-blue py-2 ttu">
						Submit
					</button>
				)}
			</form>
			{error && <div className="alert alert-danger">{errorMessage(error)}</div>}
		</>
	);
};

export default LoginForm;
