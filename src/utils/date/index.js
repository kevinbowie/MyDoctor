export const getChatTime = (date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes}`;
};

export const setDateChat = (currDate) => {
  const year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;
  const date = currDate.getDate();

  return `${year}-${month}-${date}`;
};
