'use client';

import cn from '@/utils/helpers/cn';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type Props = {
  list: any[];
  perPage: number;
};

export default function Pagination({ list, perPage }: Props) {
  // hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // variables
  const params = new URLSearchParams(searchParams);
  const pageParam = params.get('page');
  const totalPages = Math.ceil(list.length / perPage);
  const lastPage = parseInt(pageParam || '1') >= totalPages;
  const currentPage = parseInt(pageParam || '1');

  useEffect(() => {
    if (pageParam && parseInt(pageParam) <= 1) params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  }, [pageParam]);

  return (
    <ul className='flex gap-2 justify-center'>
      <PaginationStart pathname={pathname} disabled={pageParam === null} />
      <PaginationArrow
        direction='left'
        page={pageParam}
        pathname={pathname}
        disabled={pageParam === null}
      />
      {currentPage < 5 ? (
        <>
          <PaginationListItem
            currentPage={currentPage}
            page={1}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={2}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={3}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={4}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={5}
            pathname={pathname}
          />
        </>
      ) : (
        <>
          <PaginationListItem
            currentPage={currentPage}
            page={currentPage - 4}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={currentPage - 3}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={currentPage - 2}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={currentPage - 1}
            pathname={pathname}
          />
          <PaginationListItem
            currentPage={currentPage}
            page={currentPage}
            pathname={pathname}
          />
        </>
      )}
      <PaginationArrow
        direction='right'
        page={pageParam}
        pathname={pathname}
        disabled={lastPage}
      />
      <PaginationEnd
        pathname={pathname}
        disabled={lastPage}
        totalPages={totalPages}
      />
    </ul>
  );
}

function PaginationListItem({
  page,
  pathname,
  currentPage
}: {
  page: number;
  pathname: string;
  currentPage: number;
}) {
  return (
    <li>
      <Link
        className={cn(
          'text-zinc-800 border-2 border-zinc-800 flex justify-center items-center w-8 h-8 hover:bg-black hover:text-white transition',
          currentPage === page ? 'bg-black text-white pointer-events-none' : ''
        )}
        href={`${pathname}?page=${page}`}
        title={`Go to page ${page}`}
      >
        {page}
      </Link>
    </li>
  );
}

function PaginationArrow({
  direction,
  page,
  pathname,
  disabled = false
}: {
  direction: 'left' | 'right';
  page: string | null;
  pathname: string;
  disabled: boolean;
}) {
  if (!page) page = '1';

  return (
    <li>
      {direction === 'left' ? (
        <LeftArrow pathname={pathname} page={page} disabled={disabled} />
      ) : (
        <RightArrow pathname={pathname} page={page} disabled={disabled} />
      )}
    </li>
  );
}

function LeftArrow({
  pathname,
  page,
  disabled
}: {
  pathname: string;
  page: string;
  disabled?: boolean;
}) {
  return (
    <Link
      className={cn(
        'text-zinc-800 border-2 border-zinc-800 flex justify-center items-center w-8 h-8 hover:bg-black hover:text-white transition',
        disabled ? 'pointer-events-none border-zinc-300 text-zinc-300' : ''
      )}
      href={`${pathname}?page=${parseInt(page) - 1}`}
      title={`Go to page ${parseInt(page) - 1}`}
    >
      &#10094;
    </Link>
  );
}

function RightArrow({
  pathname,
  page,
  disabled
}: {
  pathname: string;
  page: string | null;
  disabled: boolean;
}) {
  if (!page) {
    return (
      <Link
        className={cn(
          'text-zinc-800 border-2 border-zinc-800 flex justify-center items-center w-8 h-8hover:bg-black hover:text-white transition',
          disabled ? 'pointer-events-none border-zinc-300 text-zinc-300' : ''
        )}
        href={`${pathname}?page=2`}
        title={`Go to page 2`}
      >
        &#10095;
      </Link>
    );
  }

  return (
    <Link
      className={cn(
        'text-zinc-800 border-2 border-zinc-800 flex justify-center items-center w-8 h-8 hover:bg-black hover:text-white transition',
        disabled ? 'pointer-events-none border-zinc-300 text-zinc-300' : ''
      )}
      href={`${pathname}?page=${parseInt(page) + 1}`}
      title={`Go to page ${parseInt(page) + 1}`}
    >
      &#10095;
    </Link>
  );
}

function PaginationStart({
  disabled = false,
  pathname
}: {
  disabled: boolean;
  pathname: string;
}) {
  return (
    <Link
      className={cn(
        'text-zinc-800 border-2 border-zinc-800 flex justify-center items-center w-8 h-8 hover:bg-black hover:text-white transition',
        disabled ? 'pointer-events-none border-zinc-300 text-zinc-300' : ''
      )}
      href={`${pathname}`}
      title='Go to first page'
    >
      &#10094;&#10094;
    </Link>
  );
}

function PaginationEnd({
  disabled = false,
  pathname,
  totalPages
}: {
  disabled: boolean;
  pathname: string;
  totalPages: number;
}) {
  return (
    <Link
      className={cn(
        'text-zinc-800 border-2 border-zinc-800 flex justify-center items-center w-8 h-8 hover:bg-black hover:text-white transition',
        disabled ? 'pointer-events-none border-zinc-300 text-zinc-300' : ''
      )}
      href={`${pathname}?page=${totalPages}`}
      title='Go to last page'
    >
      &#10095;&#10095;
    </Link>
  );
}
