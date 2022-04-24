import pages from './index.json';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getData = async (pageSize, currentPage) => {
  await timeout(3000);

  const totalItens = 45;

  return { data: pages[`page${currentPage}`], totalItens };
};
