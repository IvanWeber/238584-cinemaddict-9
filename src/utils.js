export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонентов
export const render = (container, element, place) => {
  const el = element.cloneNode(true);
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.appendChild(el);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
