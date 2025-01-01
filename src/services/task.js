import { useEffect, useState } from 'react';
import Client from './api';

const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await Client.get('/categories'); // Assuming the endpoint is `/categories`
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, []);


export const GetTasksByUserId = async (id) => {
  try {
    console.log('Fetching tasks for user ID:', id); // Debugging log
    const res = await Client.get(`/tasks/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

