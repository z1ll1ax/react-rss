import type { RenderedBook } from '../../types/Book';

interface CardProps {
  book: RenderedBook;
}

function Card({ book }: CardProps): React.ReactElement {
  return (
    <div className="card">
      <h4>{book.title}</h4>
      <p>{book.author_name}</p>
    </div>
  );
}

export default Card;
