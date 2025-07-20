const weekDayArr = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];

export function getWeekday(date: Date) {
  const weekDay = date.getDay();
  return weekDayArr[weekDay];
}
