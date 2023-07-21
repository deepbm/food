import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './Foods.module.css';
import { getFoods } from '../api/foods';
import FoodItem from './FoodItem';
import FoodForm from './FoodForm';
import useTranslate from '../hooks/useTranslate';

const LIMIT = 10;

export default function Foods() {
  const t = useTranslate();
  const [sort, setSort] = useState('createdAt');
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [editId, setEditId] = useState();
  const handleSubmit = e => {
    e.preventDefault();
    setKeyword(search);
    setSearch('');
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['foods', sort, keyword],
      queryFn: async ({ pageParam = '' }) => getFoods(sort, LIMIT, search, { pageParam }),
      getNextPageParam: lastPage => lastPage.paging.nextCursor,
      select: data => ({
        pages: data?.pages.flatMap(page => page.foods),
        pageParams: data.pageParams,
      }),
    });

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>데이터를 불러오지 못했습니다. 잠시후 다시 시도해주세요.</p>;

  return (
    <>
      <FoodForm />
      <button onClick={() => setSort('createdAt')}>{t('sort by newest')}</button>
      <button onClick={() => setSort('calorie')}>{t('sort by calorie')}</button>
      <form onSubmit={handleSubmit}>
        <input name='search' value={search} onChange={e => setSearch(e.target.value)} />
        <button type='submit'>검색</button>
      </form>
      <ul className={styles.foods}>
        {data.pages.map(food => {
          if (food.id === editId) {
            const initialFood = { ...food };
            return (
              <FoodForm
                key={food.id}
                initialFood={initialFood}
                initialPreview={food.imgUrl}
                onCancel={setEditId}
                onEdit={setEditId}
                isEditting={true}
              />
            );
          }
          return <FoodItem key={food.id} food={food} onEdit={setEditId} />;
        })}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {t('load more')}
        </button>
      )}
      <p>{isFetching && !isFetchingNextPage ? '불러오는중...' : null}</p>
    </>
  );
}
