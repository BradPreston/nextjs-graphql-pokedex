'use client';

import useSinglePokemon from '@/hooks/useSinglePokemon';
import { useParams } from 'next/navigation';

export default function PokemonInfo() {
	const params = useParams<{ id: string }>();
	const { data, isLoading, isError } = useSinglePokemon({
		id: parseInt(params.id)
	});

	if (isLoading) {
		return <h1>loading...</h1>;
	}

	if (isError) {
		return <h1>ERROR!!</h1>;
	}

	if (!data) {
		return <h1>No Pokemon were found</h1>;
	}

	return <h1>{data.getPokemonByDexNumber.species}</h1>;
}
