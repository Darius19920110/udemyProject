import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
	GET_PORTFOLIOS,
	GET_USER,
	CREATE_PORTFOLIO,
	UPDATE_PORTFOLIO,
	DELETE_PORTFOLIO,
	SIGN_IN,
	SIGN_OUT,
} from '@/apollo/queries';

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);

export const useDeletePortfolio = () =>
	useMutation(DELETE_PORTFOLIO, {
		update(cache, { data: { deletePortfolio } }) {
			const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
			const newPortfolios = portfolios.filter(p => p._id !== deletePortfolio);
			cache.writeQuery({
				query: GET_PORTFOLIOS,
				data: { portfolios: newPortfolios },
			});
		},
	});

export const useCreatePortfolio = () =>
	useMutation(CREATE_PORTFOLIO, {
		update(cache, { data: { createPortfolio } }) {
			const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
			cache.writeQuery({
				query: GET_PORTFOLIOS,
				data: { portfolios: [...portfolios, createPortfolio] },
			});
		},
		onError: ({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.forEach(({ message }) => {
					console.log(message);
				});
			}
			if (networkError) console.log(`Network Error: ${networkError}`);
		},
	});

// Auth actions start ---------------------------
export const userSignIn = (email, password) =>
	useMutation(SIGN_IN, {
		variables: {
			email: email,
			password: password,
		},
		update(cache, { data: { signIn } }) {
			cache.writeQuery({
				query: GET_USER,
				data: { user: signIn },
			});
		},
		onError: ({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.forEach(({ message }) => {
					console.log(message);
				});
			}
			if (networkError) console.log(`${networkError}`);
		},
	});

export const useSignOut = () => useMutation(SIGN_OUT);
export const useLazyGetUser = () => useLazyQuery(GET_USER);
export const useGetUser = () => useQuery(GET_USER);

// Auth actions end ---------------------------
