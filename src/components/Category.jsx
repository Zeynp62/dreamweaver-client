const Category = ({ categories, onChange }) => {
  return (
    <div>
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
  )
}

export default Category
