import React, { useEffect, useState } from 'react';
import styles from './Foods.module.css';
import { getFoods } from '../api/foods';
import FoodItem from './FoodItem';

export default function Foods() {
  const [foods, setFoods] = useState();
  const [sort, setSort] = useState('createdAt');
  const handleDelete = id => {
    setFoods(prev => prev.filter(food => food.id !== id));
  };

  useEffect(() => {
    getFoods(sort) //
      .then(data => {
        const { foods } = data;
        return setFoods(foods);
      });
  }, [sort]);

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
