export const getIslamicDate = () => {
  const date = new Date();
  return new Intl.DateTimeFormat('en-u-ca-islamic-uma-nu-latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const getGregorianDate = () => {
  const date = new Date();
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
