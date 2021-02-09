import withAuth from '@/hoc/withAuth';
import PortfolioForm from '@/components/forms/PortfolioForm';

const PortfolioNew = () => {
	return (
		<>
			<div className="bwm-form mt-5">
				<div className="row">
					<div className="col-md-5 mx-auto">
						<h1 className="page-title">Create New Portfolio</h1>
						<PortfolioForm />
					</div>
				</div>
			</div>
		</>
	);
};

// export default withAuth(PortfolioNew, ['admin', 'instructor']);
export default PortfolioNew;
