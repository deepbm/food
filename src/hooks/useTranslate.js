import { useLocale } from '../contexts/LocaleContext';

const dict = {
  ko: {
    'confirm button': '확인',
    'cancel button': '취소',
    'edit button': '수정',
    'delete button': '삭제',
    'title placeholder': '이름을 입력해주세요.',
    'calorie placeholder': '칼로리를 입력해주세요.',
    'sort by createdAt': '최신순',
    'sort by calorie': '칼로리순',
    'load more': '더 보기',
  },
  en: {
    'confirm button': 'OK',
    'cancel button': 'Cancel',
    'edit button': 'Edit',
    'delete button': 'Delete',
    'title placeholder': 'Enter name.',
    'calorie placeholder': 'Enter calorie.',
    'sort by createdAt': 'Newest',
    'sort by calorie': 'By Calorie',
    'load more': 'Load More',
  },
};

export default function useTranslate() {
  const { locale } = useLocale();
  const translate = key => dict[locale][key] || '';
  return translate;
}
