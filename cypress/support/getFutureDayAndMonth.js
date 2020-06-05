export const getFutureDayAndMonth = (dayFromToday) => {
  let date = new Date();
  date.setDate(date.getDate() + dayFromToday);

  const futureDay = date.getDate();
  const futureMonth = date.toLocaleString('default', { month: 'short' });
  const fullMonthDayYear = `${futureDay}/${futureMonth}/${date.getFullYear()}`;

  return { futureDay, futureMonth, fullMonthDayYear };
};
