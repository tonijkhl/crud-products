import { useState } from 'react';
import { createProductCategory } from '../services/api';

function NewCategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProductCategory({
        categoryName,
        categoryDescription
      });
      setMessage('Category created successfully!');
      setCategoryName('');
      setCategoryDescription('');
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('Failed to create category.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', background: 'white', maxWidth: '400px' }}>
      <h2>Create New Category</h2>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Category Name:</label><br />
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Category Description:</label><br />
        <textarea
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
      </div>

      <button type="submit">Create Category</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default NewCategoryForm;
