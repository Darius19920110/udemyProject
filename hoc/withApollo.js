import withApollo from 'next-with-apollo';
import {
	ApolloProvider,
	HttpLink,
	ApolloClient,
	InMemoryCache,
} from '@apollo/client';
import { useApollo } from '@/apollo/apollo';

export default withApollo(
	({ initialState }) => {
		return new ApolloClient({
			ssrMode: typeof window === 'undefined',
			link: new HttpLink({
				uri: 'http://localhost:3000/graphql',
				// headers: {}
			}),
			cache: new InMemoryCache().restore(initialState || {}),
		});
	},
	{
		render: ({ Page, props }) => {
			const apolloClient = useApollo(props.initialApolloState);
			return (
				<ApolloProvider client={apolloClient}>
					<Page {...props} />
				</ApolloProvider>
			);
		},
	}
);
