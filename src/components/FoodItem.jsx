import React from 'react';
import { dateFormat } from '../utils/dateFormat';

export default function FoodItem({ food: { title, calorie, createdAt } }) {
  return (
    <li>
      <p>{title}</p>
      <p>{calorie}</p>
      <p>{dateFormat(createdAt)}</p>
    </li>
  );
}
