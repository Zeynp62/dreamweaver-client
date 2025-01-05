const Category = ({ categories, onChange }) => {
  return (
    <div className="category-filter">
      {categories?.map((category) => (
        <button
          key={category._id}
          className={`${category.categoryName}`}
          onClick={() => onChange(category.posts)}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default Category;
