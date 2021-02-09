import { useGetPortfolios } from '@/apollo/actions';
import { GET_PORTFOLIOS } from '@/apollo/queries';
import Link from 'next/link';
import { initializeApollo } from '@/apollo/apollo';
import PortfolioCard from '@/components/portfolios/PortfolioCard';

const Portfolios = () => {
	const { data, error, loading } = useGetPortfolios();

	if (loading || !data.portfolios) {
		return <h1>Loading...</h1>;
	}

	if (error || !data) return <h2>Error</h2>;
	if (!data.portfolios) return [];

	const { portfolios } = data;

	return (
		<>
			<section className="section-title">
				<div className="px-2">
					<div className="pt-5 pb-4">
						<h1>Portfolios</h1>
					</div>
				</div>
			</section>
			<section className="pb-5">
				<div className="row">
					{portfolios.map(portfolio => (
						<div key={portfolio._id} className="col-md-4">
							<Link href={`/portfolios/${portfolio._id}`}>
								<a className="card-link">
									<PortfolioCard portfolio={portfolio} />
								</a>
							</Link>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export const getStaticProps = async () => {
	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: GET_PORTFOLIOS,
	});
	return {
		props: { initialApolloState: apolloClient.cache.extract() },
		revalidate: 1,
	};
};

export default Portfolios;
