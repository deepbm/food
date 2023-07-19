export function dateFormat(timestamp) {
  const date = new Date(timestamp);

  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  return `${y}년 ${m}월 ${d}일`;
}
