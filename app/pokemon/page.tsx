'use client';

import { Card } from '@/components/card';
import Link from 'next/link';
import useAllPokemon from '@/hooks/useAllPokemon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useMemo } from 'react';

const POKEMON_PER_PAGE = 20;

export default function AllPokemon() {
	const { data, isLoading, isError } = useAllPokemon();
	const searchParams = useSearchParams();
	const params = useMemo(
		() => new URLSearchParams(searchParams),
		[searchParams]
	);
	const page = params.get('page');
	const query = params.get('query');
	const pathname = usePathname();
	const { replace } = useRouter();

	useEffect(() => {
		if (page && parseInt(page) <= 1) params.delete('page');
		replace(`${pathname}?${params.toString()}`);
	}, [page, params, pathname, replace]);

	if (isLoading) {
		return <h1>loading...</h1>;
	}

	if (isError) {
		return <h1>ERROR!!</h1>;
	}

	if (!data) {
		return <h1>No Pokemon were found</h1>;
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const params = new URLSearchParams(searchParams);
		const formData = new FormData(e.currentTarget);
		const query = formData.get('query');

		if (query) {
			params.set('query', query.toString());
			params.delete('page');
		} else {
			params.delete('query');
		}

		replace(`${pathname}?${params.toString()}`);
	}

	function getQueryURLParam() {
		const params = new URLSearchParams(searchParams);
		return params.get('query') || '';
	}

	function getPageURLParam() {
		const params = new URLSearchParams(searchParams);
		return parseInt(params.get('page') || '1');
	}

	function pagination() {
		if (!data) return;
		const totalPages = Math.ceil(
			data.getAllPokemon.filter(({ species }) => !species.includes('-'))
				.length / POKEMON_PER_PAGE
		);

		return (
			<ul className="py-10 justify-center flex gap-4 items-end">
				{page && parseInt(page) > 1 && (
					<li>
						<Link
							href={`${pathname}?page=${parseInt(page) - 1}`}
							className="border-2 flex justify-center items-center w-8 h-8"
						>
							&#10094;
						</Link>
					</li>
				)}
				<li>
					<Link
						href={`${pathname}?page=1`}
						className="border-2 flex justify-center items-center w-8 h-8"
					>
						1
					</Link>
				</li>
				<li>
					<Link
						href={`${pathname}?page=2`}
						className="border-2 flex justify-center items-center w-8 h-8"
					>
						2
					</Link>
				</li>
				<li>
					<Link
						href={`${pathname}?page=3`}
						className="border-2 flex justify-center items-center w-8 h-8"
					>
						3
					</Link>
				</li>
				<li>
					<Link
						href={`${pathname}?page=4`}
						className="border-2 flex justify-center items-center w-8 h-8"
					>
						4
					</Link>
				</li>
				<li>
					<p>...</p>
				</li>
				<li>
					<Link
						href={`${pathname}?page=${totalPages}`}
						className="border-2 flex justify-center items-center w-8 h-8"
					>
						{totalPages}
					</Link>
				</li>
				{page && parseInt(page) < totalPages && (
					<li>
						<Link
							href={`${pathname}?page=${parseInt(page) + 1}`}
							className="border-2 flex justify-center items-center w-8 h-8"
						>
							&#10095;
						</Link>
					</li>
				)}
				{!page && (
					<li>
						<Link
							href={`${pathname}?page=2`}
							className="border-2 flex justify-center items-center w-8 h-8"
						>
							&#10095;
						</Link>
					</li>
				)}
			</ul>
		);
	}

	return (
		<div className="max-w-[1000px] px-8 mx-auto relative">
			<div className="h-16 sticky top-0 w-full flex justify-center items-center z-50 bg-black bg-opacity-70 backdrop-blur-lg">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="text-zinc-800 w-56 py-1 px-4 bg-white border-white border-2 rounded-tl-md rounded-bl-md"
						defaultValue={searchParams.get('query')?.toString()}
						name="query"
					/>
					<input
						type="submit"
						value="Search"
						className="w-fit border-white border-2 py-1 px-8 rounded-tr-md rounded-br-md"
					/>
				</form>
			</div>
			<div className="flex flex-wrap gap-8 pb-16 justify-center">
				{data.getAllPokemon
					.filter(
						({ species }) =>
							!species.includes('-') && species.includes(getQueryURLParam())
					)
					.filter(({ num }) => {
						if (query) return num;
						const currentNums = getPageURLParam() * POKEMON_PER_PAGE;
						return num <= currentNums && num > currentNums - POKEMON_PER_PAGE;
					})

					.map(({ species, num, types }, index) => (
						<Link href={`/pokemon/${num}`} key={index}>
							<Card name={species} types={types} id={num} />
						</Link>
					))}
			</div>
			<div className="h-16 fixed bottom-0 left-0 w-full flex justify-center items-center bg-black bg-opacity-70 z-50 backdrop-blur-lg">
				{query ? null : pagination()}
			</div>
		</div>
	);
}
