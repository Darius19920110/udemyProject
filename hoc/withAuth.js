import { useGetUser } from '@/apollo/actions';
import Redirect from '@/components/shared/Redirect';

const withAuth = (WrappedComponent, role) => props => {
	const { data: { user } = {}, loading, error } = useGetUser({
		fetchPolicy: 'network-only',
	});

	if (!loading && (!user || error) && typeof window !== 'undefined') {
		return <Redirect to="/login" />;
	}

	// TODO: Send a message to login page
	if (user) {
		if (role && !role.includes(user.role)) {
			return <Redirect to="/login" />;
		}
		return <WrappedComponent {...props} />;
	}

	return <p>Authenticating...</p>;
};

export default withAuth;
