import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BsSearch } from 'react-icons/bs';
import styles from './Foods.module.css';
import './Foods.css';
import { getFoods } from '../api/foods';
import FoodItem from './FoodItem';
import FoodForm from './FoodForm';
import useTranslate from '../hooks/useTranslate';

const LIMIT = 10;
const sortArr = ['createdAt', 'calorie'];

export default function Foods() {
  const t = useTranslate();
  const [sort, setSort] = useState(sortArr[0]);
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
      queryFn: async ({ pageParam = '' }) => getFoods(sort, LIMIT, keyword, { pageParam }),
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
      <div className={styles.Filter}>
        <form className={styles.Filter__search} onSubmit={handleSubmit}>
          <input name='search' value={search} onChange={e => setSearch(e.target.value)} />
          <button className={styles.Filter__search__btn} type='submit'>
            <BsSearch className={styles.Filter__search__icon} />
          </button>
        </form>
        <div className={styles.Filter__sort}>
          {sortArr.map((value, index) => (
            <button
              key={index}
              className={`Filter__sort__btn${value === sort ? ' selected' : ''}`}
              onClick={() => setSort(value)}
              disabled={keyword}
            >
              {t(`sort by ${value}`)}
            </button>
          ))}
        </div>
      </div>

      <ul className={styles.Foods}>
        {data.pages.map(food => {
          if (food.id === editId) {
            const initialFood = { ...food };
            return (
              <li key={food.id} className={styles.Foods__item}>
                <FoodForm
                  initialFood={initialFood}
                  initialPreview={food.imgUrl}
                  onCancel={setEditId}
                  onEdit={setEditId}
                  isEditting={true}
                />
              </li>
            );
          }
          return (
            <li key={food.id} className={styles.Foods__item}>
              <FoodItem key={food.id} food={food} onEdit={setEditId} />
            </li>
          );
        })}
      </ul>
      {hasNextPage && (
        <button
          className={styles.Foods__btn__loadMore}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {t('load more')}
        </button>
      )}
      <p>{isFetching && !isFetchingNextPage ? '불러오는중...' : null}</p>
    </>
  );
}
