import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './FoodItem.module.css';
import { formatData } from '../utils/dateFormat';
import { deleteFood } from '../api/foods';

export default function FoodItem({
  food: { id, imgUrl, title, calorie, content, createdAt },
  onEdit,
}) {
  const queryClient = useQueryClient();
  const handleEdit = () => onEdit(id);
  const removeFood = useMutation({
    mutationFn: deleteFood,
    onSuccess: () => queryClient.invalidateQueries(['foods']),
  });
  const handleDelete = () => {
    removeFood.mutate(id);
  };

  return (
    <li className={styles.foods__item}>
      <img src={imgUrl} alt={title} />
      <p>{title}</p>
      <p>{calorie}</p>
      <p>{content}</p>
      <p>{formatData(createdAt)}</p>
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </li>
  );
}
