export type selectOption = {
  value: string;
  label: string;
};
export function getCatalogueOptions(catalogues: string[]): selectOption[] {
  const options: selectOption[] = [];
  catalogues.forEach((item) => {
    options.push({
      value: item,
      label: item,
    });
  });
  return options;
}