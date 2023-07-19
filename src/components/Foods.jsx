import React, { useState } from 'react';
import styles from './Foods.module.css';
import { getFoods } from '../api/foods';
import FoodItem from './FoodItem';
import { useQuery } from '@tanstack/react-query';

export default function Foods() {
  const [sort, setSort] = useState('createdAt');
  const handleDelete = id => {
    // setFoods(prev => prev.filter(food => food.id !== id));
  };

  const {
    isLoading,
    error,
    data: foods,
  } = useQuery({
    queryKey: ['foods', sort],
    queryFn: async () => {
      return getFoods(sort) //
        .then(data => {
          const { foods } = data;
          return foods;
        });
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>데이터를 불러오지 못했습니다. 잠시후 다시 시도해주세요.</p>;

  return (
    <>
      <button onClick={() => setSort('createdAt')}>최신순</button>
      <button onClick={() => setSort('calorie')}>칼로리순</button>
      <ul className={styles.foods}>
        {foods && foods.map(food => <FoodItem key={food.id} food={food} onDelete={handleDelete} />)}
      </ul>
    </>
  );
}
