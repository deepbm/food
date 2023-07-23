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
    <div className={styles.FoodItem__container}>
      <img className={styles.FoodItem__preview} src={imgUrl} alt={title} />
      <div className={styles.FoodItem__info}>
        <div className={styles.FoodItem__info__top}>
          <p className={styles.FoodItem__info__title}>{title}</p>
          <p className={styles.FoodItem__info__calorie}>{calorie}kcal</p>
        </div>
        <p className={styles.FoodItem__info__content}>{content}</p>
        <div className={styles.FoodItem__info__bottom}>
          <p className={styles.FoodItem__info__date}>{formatData(createdAt)}</p>
          <div className={styles.FoodItem__info__btns}>
            <button className={styles.FoodItem__btn__edit} onClick={handleEdit}>
              {t('edit button')}
            </button>
            <button className={styles.FoodItem__btn__delete} onClick={handleDelete}>
              {t('delete button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
