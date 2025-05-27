import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="block group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="h-40 bg-gray-200 overflow-hidden">
        <img
          src={category.image || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-white font-medium">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;