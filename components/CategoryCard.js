import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="category-card" style={{ cursor: 'pointer' }}>
        <div className="category-emoji">{category.emoji || '📱'}</div>
        <div className="category-name">{category.title}</div>
        <div className="category-description">Explore {category.title.toLowerCase()}</div>
      </div>
    </Link>
  );
}
