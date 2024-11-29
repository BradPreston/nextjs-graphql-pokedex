import { GetOnePokemonDocument, GetOnePokemonQuery } from '@/src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

export default function useSinglePokemon({ id }: { id: number }) {
	return useQuery<GetOnePokemonQuery>({
		queryKey: ['singlePokemon'],
		queryFn: async () =>
			request('https://graphqlpokemon.favware.tech/v8', GetOnePokemonDocument, {
				number: id
			})
	});
}
