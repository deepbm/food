import React from 'react';
import styles from './FoodItem.module.css';
import { formatData } from '../utils/dateFormat';

export default function FoodItem({ food: { imgUrl, title, calorie, content, createdAt } }) {
  return (
    <li className={styles.foods__item}>
      <img src={imgUrl} alt={title} />
      <p>{title}</p>
      <p>{calorie}</p>
      <p>{content}</p>
      <p>{formatData(createdAt)}</p>
    </li>
  );
}
