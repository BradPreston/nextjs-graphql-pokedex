'use client';

import { Card } from '@/components/card';
import Link from 'next/link';
import useAllPokemon from '@/hooks/useAllPokemon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useMemo } from 'react';
import Pagination from '@/components/pagination';

const POKEMON_PER_PAGE = 20;

export default function AllPokemon() {
  const { data, isLoading, isError } = useAllPokemon();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const query = params.get('query');
  const pathname = usePathname();
  const { replace } = useRouter();

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

    return (
      <div className='flex items-center'>
        <Pagination
          list={data.getAllPokemon.filter(
            ({ species }) => !species.includes('-')
          )}
          perPage={POKEMON_PER_PAGE}
        />
      </div>
    );
  }

  return (
    <div className='max-w-[1000px] px-8 mx-auto relative'>
      <div className='h-16 fixed top-0 w-full left-0 flex justify-center items-center z-50 bg-white bg-opacity-70 backdrop-blur-lg'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='text-zinc-800 w-56 py-1 px-4 bg-white border-zinc-800 border-2 border-r-0 rounded-tl-md rounded-bl-md'
            defaultValue={searchParams.get('query')?.toString()}
            name='query'
          />
          <input
            type='submit'
            value='Search'
            className='w-fit border-zinc-700 border-2 py-1 px-8 text-white bg-zinc-700 rounded-tr-md rounded-br-md cursor-pointer hover:bg-zinc-900 hover:border-zinc-900 transition'
          />
        </form>
      </div>
      <div className='grid grid-cols-2 gap-8 my-20 md:grid-cols-4'>
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
      <div className='h-16 fixed bottom-0 left-0 w-full flex justify-center items-center bg-white bg-opacity-70 z-50 backdrop-blur-lg'>
        {query ? null : pagination()}
      </div>
    </div>
  );
}
