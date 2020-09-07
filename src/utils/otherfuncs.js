export const animationfunc = (e) => {
  const { target } = e;
  target.innerHTML =
    "<div><span>" +
    target.textContent.trim().split(" ").join("</span><span>") +
    "</span></div>";
};
