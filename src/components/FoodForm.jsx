import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import sanitize from '../utils/sanitize';
import { addFood, updateFood } from '../api/foods';

export default function FoodForm({ initialFood, initialPreview, onCancel, onEdit, isEditting }) {
  const [form, setForm] = useState(initialFood || {});
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(initialPreview || null);
  const fileRef = useRef();
  const queryClient = useQueryClient();
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
    <form onSubmit={handleSubmit}>
      {preview && <img src={preview} alt='이미지 미리보기' />}
      <input ref={fileRef} type='file' name='file' onChange={handleChange} />
      <button type='button' onClick={handleFileClear}>
        초기화
      </button>
      <input name='title' value={form.title ?? ''} onChange={handleChange} />
      <input type='number' name='calorie' value={form.calorie ?? 0} onChange={handleChange} />
      <input name='content' value={form.content ?? ''} onChange={handleChange} />
      <button onClick={onCancel}>취소</button>
      <button disabled={addNewFood.isLoading || editFood.isLoading}>확인</button>
    </form>
  );
}
