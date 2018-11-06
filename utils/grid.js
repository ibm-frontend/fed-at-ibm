import gridInJS from "grid-in-js";

export const grid = {
  breakpoints: [
    {
      columns: 4,
      margin: 0,
      name: "sm",
      gutter: 32,
      size: 0
    },
    {
      columns: 8,
      margin: 16,
      name: "md",
      gutter: 32,
      size: 672
    },
    {
      columns: 16,
      margin: 16,
      name: "lg",
      gutter: 32,
      size: 1056
    },
    {
      columns: 16,
      margin: 16,
      name: "xl",
      gutter: 32,
      size: 1312
    },
    {
      columns: 16,
      margin: 32,
      name: "max",
      gutter: 32,
      size: 1584
    }
  ],
  maxWidth: 1584,
  prefix: "ibm--",
  progressive: false,
  subgrid: true,
  support: "cssVariables"
};

export const breakpoints = grid.breakpoints.reduce((result, item) => {
  result[item.name] = item;
  return result;
}, {});

export default gridInJS(grid);
