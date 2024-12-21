export const formatDate = (date, dateOnly = false) => {
    const options = dateOnly
      ? { year: 'numeric', month: '2-digit', day: '2-digit' } // Только дата
      : { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }; // Дата с временем
  
    return new Date(date)
      .toLocaleString('ru-RU', options)
      .replace(',', '');
  };