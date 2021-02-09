import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/apollo/apollo';
import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/shared/Hero';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);
	const isHomePage = () => Component.name === 'Home';

	return (
		<ApolloProvider client={apolloClient}>
			<div className="portfolio-app">
				<Navbar />
				{isHomePage() && <Hero />}
				<div className="container">
					<Component {...pageProps} />
				</div>
				{/* FOOTER STARTS */}
				{isHomePage() && (
					<footer
						id="sticky-footer"
						className="py-4 bg-black text-white-50 py-3"
					>
						<div className="container text-center">
							<small>Copyright &copy; Your Website</small>
						</div>
					</footer>
				)}
				{/* FOOTER ENDS */}
			</div>
		</ApolloProvider>
	);
};

export default MyApp;
