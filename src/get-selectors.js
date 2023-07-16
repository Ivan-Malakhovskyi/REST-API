function getSelectors() {
  const selectors = {
    select: document.querySelector('#selectElement'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    div: document.querySelector('.cat-info'),
  };
  return selectors;
}

export { getSelectors };
