'use client';

import cn from '@/utils/helpers/cn';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
	name: string;
	types: { __typename?: 'PokemonType' | undefined; name: string }[];
	className?: string;
	id: number;
};

type Colors = {
	[key: string]: {
		[key: string]: string;
	};
};

function gradient(start: string, end: string) {
	const typeColors: Colors = {
		from: {
			Bug: 'from-lime-500',
			Dark: 'from-slate-500',
			Dragon: 'from-amber-500',
			Electric: 'from-yellow-500',
			Fairy: 'from-teal-500',
			Fighting: 'from-orange-500',
			Fire: 'from-red-500',
			Flying: 'from-sky-500',
			Ghost: 'from-violet-500',
			Grass: 'from-green-500',
			Ground: 'from-yellow-800',
			Ice: 'from-cyan-300',
			Normal: 'from-zinc-200',
			Poison: 'from-purple-500',
			Psychic: 'from-indigo-600',
			Rock: 'from-zinc-800',
			Steel: 'from-zinc-400',
			Water: 'from-blue-500'
		},
		to: {
			Bug: 'to-lime-500',
			Dark: 'to-slate-500',
			Dragon: 'to-amber-500',
			Electric: 'to-yellow-500',
			Fairy: 'to-teal-500',
			Fighting: 'to-orange-500',
			Fire: 'to-red-500',
			Flying: 'to-sky-500',
			Ghost: 'to-violet-500',
			Grass: 'to-green-500',
			Ground: 'to-yellow-800',
			Ice: 'to-cyan-300',
			Normal: 'to-zinc-200',
			Poison: 'to-purple-500',
			Psychic: 'to-indigo-600',
			Rock: 'to-zinc-800',
			Steel: 'to-zinc-400',
			Water: 'to-blue-500'
		}
	};

	return `bg-gradient-to-r ${typeColors['from'][start]} ${
		typeColors['to'][end || start]
	}`;
}

export function Card({ name, types, id, className = '' }: Props) {
	const [imageError, setImageError] = useState(false);
	return (
		<div className="w-48 bg-zinc-50 p-4 rounded-xl relative">
			<p className="text-zinc-800 absolute top-4 left-4 z-10 font-bold">
				#{id}
			</p>
			<Image
				src={
					!imageError
						? `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork/${id}.png`
						: '/images/no-image-available.png'
				}
				alt={`${name} sprite`}
				width={200}
				height={200}
				onError={() => setImageError(true)}
				className="p-4 relative z-10 object-contain w-full aspect-square"
			/>
			<div
				className={cn(
					'absolute w-full aspect-square top-0 left-0 upper-left-triangle rounded-tl-xl rounded-tr-xl opacity-50',
					`${gradient(types[0].name, types[1]?.name)}`,
					className
				)}
			/>
			<h2 className="text-zinc-800 capitalize text-xl text-center font-bold">
				{name}
			</h2>
		</div>
	);
}
