import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO } from '@/apollo/queries';
import { initializeApollo } from '../../apollo/apollo';

const portfolioDetail = ({ queryId }) => {
	const { data, loading, error } = useQuery(GET_PORTFOLIO, {
		variables: { id: queryId },
	});

	if (loading) return <h1>Loading...</h1>;

	if (error || !data) return <h2>Error</h2>;
	if (!data.portfolio) return <h2>404 | Not Found</h2>;

	const { portfolio } = data;

	return (
		<div className="portfolio-detail">
			<div className="container">
				<div className="jumbotron">
					<h1 className="display-3">{portfolio.title}</h1>
					<p className="lead">{portfolio.jobTitle}</p>
					<p>
						<a
							className="btn btn-lg btn-success"
							href={portfolio.companyWebsite}
							role="button"
						>
							{portfolio.company}
						</a>
					</p>
				</div>

				<div className="row marketing">
					<div className="col-lg-6">
						<h4 className="title">Location</h4>
						<p className="text">{portfolio.location}</p>

						<h4 className="title">Start Date</h4>
						<p className="text">{portfolio.startDate}</p>
					</div>

					<div className="col-lg-6">
						{/* TODO: days later... */}
						<h4 className="title">Days</h4>
						<p className="text">44</p>

						<h4 className="title">End Date</h4>
						<p className="text">{portfolio.endDate}</p>
					</div>
					<div className="col-md-12">
						<hr />
						<h4 className="title">Description</h4>
						<p>{portfolio.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ query }) => {
	const queryId = query.id;

	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: GET_PORTFOLIO,
		variables: { id: queryId },
	});
	return {
		props: { initialApolloState: apolloClient.cache.extract(), queryId },
	};
};

export default portfolioDetail;
