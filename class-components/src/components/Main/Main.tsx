import React from 'react';
import CardList from '../CardList/CardList';
import type { RenderedBook } from '../../types/Book';

interface MainProps {
  books: RenderedBook[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

function Main({
  books,
  loading,
  error,
  searchQuery,
}: MainProps): React.ReactElement {
  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!books.length) {
    return <div>No books found for {searchQuery}</div>;
  }

  return (
    <div>
      <h2>Results for {searchQuery}</h2>
      <CardList books={books} />
    </div>
  );
}

export default Main;
