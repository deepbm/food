export function formatData(timestamp) {
  const date = new Date(timestamp);

  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  return `${y}년 ${m + 1}월 ${d}일`;
}
