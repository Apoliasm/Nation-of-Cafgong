export default function compareLocaleDateSame(dateA: Date, dateB: Date) {
  if (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  ) {
    return true;
  }
  return false;
}
