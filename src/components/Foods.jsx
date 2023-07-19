import React, { useEffect, useState } from 'react';
import { getFoods } from '../api/foods';
import FoodItem from './FoodItem';

export default function Foods() {
  const [foods, setFoods] = useState();
  useEffect(() => {
    getFoods() //
      .then(setFoods);
  }, []);

  return <ul>{foods && foods.map(food => <FoodItem key={food.id} food={food} />)}</ul>;
}
