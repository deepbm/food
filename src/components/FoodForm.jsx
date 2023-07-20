import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import sanitize from '../utils/sanitize';
import { addFood } from '../api/foods';

export default function FoodForm() {
  const [form, setForm] = useState({});
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
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
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgFile', file);
    formData.append('title', form.title);
    formData.append('calorie', form.calorie);
    formData.append('content', form.content);

    addNewFood.mutate(formData, {
      onSuccess: () => {
        setForm({});
        handleFileClear();
      },
    });
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
      <button disabled={addNewFood.isLoading}>확인</button>
    </form>
  );
}