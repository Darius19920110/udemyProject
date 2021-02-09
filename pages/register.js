import RegisterForm from '@/components/forms/RegisterForm';
import withApollo from '@/hoc/withApollo';

const Register = () => {
	return (
		<div className="bwm-form mt-5">
			<div className="row">
				<div className="col-md-5 mx-auto">
					<h1 className="page-title">Register</h1>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
};

export default withApollo(Register);
