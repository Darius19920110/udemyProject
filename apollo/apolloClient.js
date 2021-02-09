import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: new HttpLink({
			uri: 'http://localhost:3000/graphql',
			// headers: {}
		}),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						portfolios: {
							merge(existing, incoming) {
								// Equivalent to what happens if there is no custom merge function.
								return incoming;
							},
						},
					},
				},
			},
		}),
	});
}

export default createApolloClient;
