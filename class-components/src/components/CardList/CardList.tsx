import React from 'react';
import Card from '../Card/Card';
import type { RenderedBook } from '../../types/Book';

interface CardListProps {
  books: RenderedBook[];
}

class CardList extends React.Component<CardListProps> {
  render() {
    const { books } = this.props;
    if (!books.length) {
      return <div>No books found</div>;
    }
    return (
      <div className="card-list">
        {books.map((book: RenderedBook, index: number) => (
          <Card key={index} book={book} />
        ))}
      </div>
    );
  }
}

export default CardList;
