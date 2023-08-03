import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiFillCloseSquare } from 'react-icons/ai';
import styles from './FoodForm.module.css';
import placeholderImg from '../img/file_preview.png';
import sanitize from '../utils/sanitize';
import { addFood, updateFood } from '../api/foods';
import useTranslate from '../hooks/useTranslate';

export default function FoodForm({ initialFood, initialPreview, onCancel, isEditting }) {
  const [form, setForm] = useState(initialFood || {});
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(initialPreview || null);
  const fileRef = useRef();
  const queryClient = useQueryClient();
  const t = useTranslate();
  const handleChange = e => {
    const { name, type, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setForm(prev => ({ ...prev, [name]: sanitize(type, value) }));
  };
  const handleFileClear = () => {
    const fileNode = fileRef.current;
    if (!fileNode) return;
    fileNode.value = '';
    setFile();
  };
  const addNewFood = useMutation({
    mutationFn: addFood,
    onSuccess: () => queryClient.invalidateQueries(['foods']),
  });
  const editFood = useMutation({
    mutationFn: ({ id, formData }) => updateFood(id, formData),
    onSuccess: () => queryClient.invalidateQueries(['foods']),
  });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title) {
      alert('이름을 입력해주세요.');
    } else if (!form.calorie) {
      alert('칼로리를 입력해주세요.');
    } else if (!form.content) {
      alert('내용을 입력해주세요.');
    } else {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('calorie', form.calorie);
      formData.append('content', form.content);
      if (file) formData.append('imgFile', file);

      if (isEditting) {
        editFood.mutate(
          { id: form.id, formData },
          {
            onSuccess: () => {
              setForm({});
              handleFileClear();
              onCancel();
            },
          }
        );
      } else {
        addNewFood.mutate(formData, {
          onSuccess: () => {
            setForm({});
            handleFileClear();
          },
        });
      }
    }
  };

  useEffect(() => {
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [file]);

  return (
    <form className={styles.FoodForm} onSubmit={handleSubmit}>
      <div className={styles.FoodForm__preview}>
        <img
          className={styles.FoodForm__preview__img}
          src={preview || placeholderImg}
          alt='이미지 미리보기'
        />
        <input
          className={styles.FoodForm__preview__file}
          ref={fileRef}
          type='file'
          name='file'
          onChange={handleChange}
        />
        {preview && (
          <button
            className={styles.FoodForm__preview__clear}
            type='button'
            onClick={handleFileClear}
          >
            <AiFillCloseSquare className={styles.FoodForm__preview__icon} />
          </button>
        )}
      </div>
      <div className={styles.FoodForm__info}>
        <div className={styles.FoodForm__info__top}>
          <input
            className={styles.FoodForm__input__title}
            name='title'
            value={form.title ?? ''}
            onChange={handleChange}
            placeholder={t('title placeholder')}
          />
          <input
            className={styles.FoodForm__input__calorie}
            type='number'
            name='calorie'
            value={form.calorie ?? 0}
            onChange={handleChange}
            placeholder={t('calorie placeholder')}
          />
          {isEditting && (
            <button className={styles.FoodForm__btn__cancel} onClick={onCancel}>
              {t('cancel button')}
            </button>
          )}
          <button
            className={styles.FoodForm__btn__submit}
            disabled={addNewFood.isLoading || editFood.isLoading}
          >
            {t('confirm button')}
          </button>
        </div>
        <textarea
          className={styles.FoodForm__textarea__content}
          name='content'
          value={form.content ?? ''}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
