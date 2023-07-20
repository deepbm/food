import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './Foods.module.css';
import { getFoods } from '../api/foods';
import FoodItem from './FoodItem';
import FoodForm from './FoodForm';

const LIMIT = 10;

export default function Foods() {
  const [sort, setSort] = useState('createdAt');
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const handleDelete = id => {
    // setFoods(prev => prev.filter(food => food.id !== id));
  };
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
      <button onClick={() => setSort('createdAt')}>최신순</button>
      <button onClick={() => setSort('calorie')}>칼로리순</button>
      <form onSubmit={handleSubmit}>
        <input name='search' value={search} onChange={e => setSearch(e.target.value)} />
        <button type='submit'>검색</button>
      </form>
      <ul className={styles.foods}>
        {data.pages.map(food => (
          <FoodItem key={food.id} food={food} onDelete={handleDelete} />
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          더보기
        </button>
      )}
      <p>{isFetching && !isFetchingNextPage ? '불러오는중...' : null}</p>
    </>
  );
}
