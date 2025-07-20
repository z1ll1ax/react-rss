import Search from '../Search/Search';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

function Header({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HeaderProps): React.ReactElement {
  return (
    <div className="header">
      <Search
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
      />
      <button
        type="button"
        onClick={() => onSearchSubmit()}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
}

export default Header;
