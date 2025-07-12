import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import type { Book, RenderedBook } from './types/Book';

interface AppState {
  searchQuery: string;
  books: RenderedBook[];
  loading: boolean;
  error: string | null;
}

class App extends React.Component<AppState> {
  state: AppState = {
    searchQuery: '',
    books: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    const { searchQuery } = this.state;

    this.setState({ loading: true, error: null });

    try {
      const query = searchQuery.trim() ? encodeURIComponent(searchQuery) : '*';
      const URL = `https://openlibrary.org/search.json?q=${query}&limit=20`;
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`error: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.docs) {
        const booksData: RenderedBook[] = data.docs.map((item: Book) => ({
          title: item.title || 'Untitled',
          author_name: item.author_name
            ? item.author_name.join(', ')
            : 'Unknown author',
        }));

        this.setState({
          books: booksData,
          loading: false,
        });
      } else {
        throw new Error('No books found in response');
      }
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        errorMessage = 'An unknown error occurred';
      }

      this.setState({
        error: errorMessage,
        loading: false,
      });
    }
  };

  onSearchChange = (query: string) => {
    this.setState({ searchQuery: query });
  };

  handleSearchSubmit = () => {
    this.fetchBooks();
  };

  render() {
    return (
      <div className="app">
        <Header
          searchQuery={this.state.searchQuery}
          onSearchChange={this.onSearchChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <Main
          books={this.state.books}
          loading={this.state.loading}
          error={this.state.error}
          searchQuery={this.state.searchQuery}
        />
      </div>
    );
  }
}

export default App;
