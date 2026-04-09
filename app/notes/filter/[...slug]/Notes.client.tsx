

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import Link from 'next/link';

interface Props {
    tag: NoteTag | 'all';
}

export default function NotesClient({ tag }: Props) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', tag, page, search],
        queryFn: () =>
            fetchNotes({
                page,
                search,
                tag,
            }),
    });

    const handlePageChange = (selectedPage: number) => {
        setPage(selectedPage);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error loading notes</p>;

    return (
        <div>

            <Link href="/notes/action/create">
                <button>Create note</button>
            </Link>


            <SearchBox onSearch={handleSearch} />


            <NoteList notes={data.notes} />


            <Pagination
                totalPages={data.totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
            />
        </div>
    );
}