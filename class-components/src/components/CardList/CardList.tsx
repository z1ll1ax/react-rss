import React from 'react';
import Card from '../Card/Card';
import type { Book, RenderedBook } from '../../types/Book';

class CardList extends React.Component {
  state = {
    books: [],
    loading: true,
    error: null,
  };

  componentDidMount(): void {
    this.fetchBooks();
  }

  fetchBooks = async (): Promise<void> => {
    const URL = 'https://openlibrary.org/search.json?q=*&limit=20';

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`error: ${response}`);
      }
      const data = await response.json();
      if (data && data.docs) {
        console.log(data);
        this.setState({
          books: data.docs,
          loading: false,
        });
      } else {
        throw new Error('No books found in response');
      }
    } catch (error) {
      this.setState({
        error: error,
        loading: false,
      });
    }
  };

  render() {
    const { books, loading, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }
    if (loading) {
      return <div>Loading books...</div>;
    }
    if (!books.length) {
      return <div>No books found</div>;
    }
    const booksData: RenderedBook[] = books.map((book: Book) => ({
      title: book.title || 'Untitled',
      author_name: book.author_name
        ? book.author_name.join(', ')
        : 'Unknown author',
    }));

    return (
      <div className="card-list">
        {booksData.map((book: RenderedBook, index: number) => (
          <Card key={index} book={book} />
        ))}
      </div>
    );
  }
}

export default CardList;
