import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSignOut } from '@/apollo/actions';

const Logout = () => {
	const router = useRouter();
	const [signOut, { client }] = useSignOut();

	useEffect(() => {
		signOut().then(() => client.resetStore());
		router.push('/login');
	}, []);

	return (
		<>
			<div className="bwm-form mt-5">
				<div className="row">
					<div className="col-md-5 mx-auto">
						<h1 className="page-title">Logout</h1>
						<p>Signin Out...</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Logout;
