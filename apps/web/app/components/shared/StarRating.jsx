export default function StarRating({ rating }) {
  return <span className="stars">{"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}</span>;
}
