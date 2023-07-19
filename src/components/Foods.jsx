import React, { useEffect, useState } from 'react';
import styles from './Foods.module.css';
import { getFoods } from '../api/foods';
import FoodItem from './FoodItem';

export default function Foods() {
  const [foods, setFoods] = useState();
  const handleNew = () => {
    getFoods('createdAt').then(setFoods);
  };
  const handleCalorie = () => {
    getFoods('calorie').then(setFoods);
  };
  useEffect(() => {
    getFoods() //
      .then(setFoods);
  }, []);

  return (
    <>
      <button onClick={handleNew}>최신순</button>
      <button onClick={handleCalorie}>칼로리순</button>
      <ul className={styles.foods}>
        {foods && foods.map(food => <FoodItem key={food.id} food={food} />)}
      </ul>
    </>
  );
}
