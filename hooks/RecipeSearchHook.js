import {useState} from 'react';

const useRecipeSearch = () => {
  const [input, setInput] = useState({letters: ''});
  const handleSearchChange = (text) => {
    setInput((inputs) => ({
      ...input,
      letters: text,
    }));
  };
  return {
    handleSearchChange,
    input,
  };
};

export default useRecipeSearch;
