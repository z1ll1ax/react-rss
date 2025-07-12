import Search from '../Search/Search';

function Header(): React.ReactElement {
  return (
    <div className="header">
      <button>Error</button>
      <Search />
      <button>Search</button>
    </div>
  );
}

export default Header;
