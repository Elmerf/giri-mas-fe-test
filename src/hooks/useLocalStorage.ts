const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const retrieveItem = (key: string) => {
    return localStorage.getItem(key);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return { setItem, retrieveItem, removeItem };
};

export default useLocalStorage;
