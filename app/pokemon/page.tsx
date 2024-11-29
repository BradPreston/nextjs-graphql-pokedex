'use client';

import { Card } from '@/components/card';
import Link from 'next/link';
import useAllPokemon from '@/hooks/useAllPokemon';

export default function AllPokemon() {
	const { data, isLoading, isError } = useAllPokemon();

	if (isLoading) {
		return <h1>loading...</h1>;
	}

	if (isError) {
		return <h1>ERROR!!</h1>;
	}

	if (!data) {
		return <h1>No Pokemon were found</h1>;
	}

	return (
		<div className="flex flex-wrap gap-8">
			{data.getAllPokemon
				.filter(({ species }) => !species.includes('-'))
				.map(({ species, num, types }, index) => (
					<Link href={`/pokemon/${num}`} key={index}>
						<Card name={species} types={types} id={num} />
					</Link>
				))}
		</div>
	);
}
