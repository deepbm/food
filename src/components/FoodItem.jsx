import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './FoodItem.module.css';
import { formatData } from '../utils/dateFormat';
import { deleteFood } from '../api/foods';
import useTranslate from '../hooks/useTranslate';

export default function FoodItem({
  food: { id, imgUrl, title, calorie, content, createdAt },
  onEdit,
}) {
  const t = useTranslate();
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
      <button onClick={handleEdit}>{t('edit button')}</button>
      <button onClick={handleDelete}>{t('delete button')}</button>
    </li>
  );
}
