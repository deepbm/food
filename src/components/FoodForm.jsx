import React, { useEffect, useRef, useState } from 'react';
import sanitize from '../utils/sanitize';

export default function FoodForm() {
  const [form, setForm] = useState({});
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const fileRef = useRef();
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
  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
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
      <button>확인</button>
    </form>
  );
}
