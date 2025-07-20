interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

function Search({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: SearchProps): React.ReactElement {
  return (
    <div className="search">
      <input
        className="search-field"
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
      />
    </div>
  );
}

export default Search;
