const colorInputs = [...document.querySelectorAll("input[type=color]")];
const fontSizeInput = document.querySelector("#font-scale");
const copyButton = document.querySelector(".form__buttons--copy");
const saveButton = document.querySelector(".form__buttons--save");

let colors = [
  "#5f3dc4",
  "#7048e8",
  "#7950f2",
  "#845ef7",
  "#212529",
  "#495057",
  "#ced4da",
  "#f1f3f5",
  "#c92a2a",
  "#087f5b",
  "#f08c00",
  "#c6c7cd",
];

colors.forEach((style, index) => {
  colorInputs[index].value = style;
});

const cssColorVariables = [];
const cssFontSizeVariables = [];
let cssPureSizes = "";

const createColorVariables = () => {
  colors = []
  colorInputs.forEach((input) => {
    const colorVar = `--color-${input.id}: ${input.value};`;
    cssColorVariables.push(colorVar);
    colors.push(input.value);
  });

  return cssColorVariables;
};

const createFontSizeVariables = () => {

  if (!fontSizeInput.value.trim()) {
    return []
  }

  const fontSizeValue = fontSizeInput.value
    .replace(/\s/g, "")
    .split(",")
    .map((value) => Number(value) / 16);

  fontSizeValue.forEach((value, index) => {
    const fontVar = `--font-size-${index + 1}: ${value}rem;`;
    cssFontSizeVariables.push(fontVar);
    cssPureSizes = fontSizeInput.value.replace(/\s/g, "");
  });

  return cssFontSizeVariables;
};

copyButton.addEventListener("click", (e) => {
  e.preventDefault();

  copyButton.innerText = "Copied!";

  setTimeout(() => {
    copyButton.innerText = "Copy Styles";
  }, 3000);

  navigator.clipboard.writeText([
    ...createColorVariables(),
    ...createFontSizeVariables(),
  ].join(""));
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  saveButton.innerText = "Saved!";

  setTimeout(() => {
    saveButton.innerText = "Save Styles";
  }, 3000);

  createColorVariables();
  createFontSizeVariables();

  localStorage.setItem("@colors", JSON.stringify(colors));
  localStorage.setItem("@fonts", JSON.stringify(cssPureSizes));
});

if (localStorage.getItem("@colors")) {
  colors = JSON.parse(localStorage.getItem("@colors"));
  colors.forEach((style, index) => {
    colorInputs[index].value = style;
  });
}

if (localStorage.getItem("@fonts")) {
  fontSizeInput.value = JSON.parse(localStorage.getItem("@fonts"))
}