import { GetAllPokemonDocument, GetAllPokemonQuery } from '@/src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

export default function useAllPokemon() {
	return useQuery<GetAllPokemonQuery>({
		queryKey: ['allPokemon'],
		queryFn: async () =>
			request('https://graphqlpokemon.favware.tech/v8', GetAllPokemonDocument)
	});
}
