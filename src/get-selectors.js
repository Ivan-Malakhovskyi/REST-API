function getSelectors() {
  const selectors = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    div: document.querySelector('.cat-info'),
  };
  return selectors;
}

export { getSelectors };
