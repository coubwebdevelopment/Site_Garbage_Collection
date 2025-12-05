function repositionBlockOnMobile() {
  const infoBlock = document.querySelector('.direction__info');
  const titleDirection = document.querySelector('.direction__h2');
  const image = document.querySelector('.direction__image--bg');
  const contentBlock = document.querySelector('.direction__content');

  //Если нужные элементы не найдены, выходим из функции
  if (!infoBlock || !titleDirection || !image || !contentBlock) {
    return;
  }

  // Сохраняем исходную позицию блоков
  const infoBlockOriginalParent = infoBlock ? infoBlock.parentElement : null;
  const infoBlockOriginalNextSibling = infoBlock
    ? infoBlock.nextElementSibling
    : null;

  const imageOriginalParent = image ? image.parentElement : null;
  const imageOriginalNextSibling = image ? image.nextElementSibling : null;

  // Функция проверки размера экрана и перемещения блока
  function checkAndMove() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (infoBlock && titleDirection) {
        if (
          infoBlock.parentElement !== titleDirection.parentElement ||
          infoBlock.previousElementSibling !== titleDirection
        ) {
          titleDirection.parentElement.insertBefore(
            infoBlock,
            titleDirection.nextElementSibling
          );
        }
      }

      // Перемещаем изображение после content блока
      if (image && contentBlock) {
        if (image.previousElementSibling !== contentBlock) {
          contentBlock.parentElement.insertBefore(
            image,
            contentBlock.nextElementSibling
          );
        }
      }
    } else {
      // Возвращаем infoBlock на исходное место
      if (infoBlock && infoBlockOriginalParent) {
        if (infoBlock.parentElement !== infoBlockOriginalParent) {
          // Проверяем, существует ли еще originalNextSibling в родителе
          if (
            infoBlockOriginalNextSibling &&
            infoBlockOriginalNextSibling.parentElement ===
              infoBlockOriginalParent
          ) {
            infoBlockOriginalParent.insertBefore(
              infoBlock,
              infoBlockOriginalNextSibling
            );
          } else {
            infoBlockOriginalParent.appendChild(infoBlock);
          }
        }
      }

      // Возвращаем изображение на исходное место
      if (image && imageOriginalParent) {
        if (image.parentElement !== imageOriginalParent) {
          // Проверяем, существует ли еще imageOriginalNextSibling в родителе
          if (
            imageOriginalNextSibling &&
            imageOriginalNextSibling.parentElement === imageOriginalParent
          ) {
            imageOriginalParent.insertBefore(image, imageOriginalNextSibling);
          } else {
            imageOriginalParent.appendChild(image);
          }
        }
      }
    }
  }

  // Выполняем при загрузке
  checkAndMove();

  // Выполняем при изменении размера окна
  window.addEventListener('resize', checkAndMove);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', repositionBlockOnMobile);
} else {
  repositionBlockOnMobile();
}

function reorderOnMobile() {
  const h2 = document.querySelector('.benefits__h2');
  const items = document.querySelector('.benefits__items');
  const content = document.querySelector('.benefits__content');

  if (!h2 || !items || !content) {
    return;
  }

  if (window.innerWidth <= 1030) {
    if (h2.nextElementSibling !== items) {
      h2.after(items);
    }
  } else {
    if (items.parentElement !== content) {
      content.appendChild(items);
    }
  }
}

// Вызываем только если элементы существуют
if (document.querySelector('.benefits__h2')) {
  reorderOnMobile();
  window.addEventListener('resize', reorderOnMobile);
}

// Получаем элементы
const buttonUp = document.querySelector('.button__up');
const buttonUpLink = document.querySelector('.button__up-link');

// Функция для показа/скрытия кнопки
function toggleButtonVisibility() {
  const scrollThreshold = window.innerHeight;

  if (window.pageYOffset > scrollThreshold) {
    buttonUp.classList.add('active');
  } else {
    buttonUp.classList.remove('active');
  }
}

// Слушаем событие прокрутки с оптимизацией через requestAnimationFrame
let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      toggleButtonVisibility();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

// Плавная прокрутка вверх при клике
buttonUpLink.addEventListener('click', (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Проверяем при загрузке страницы
toggleButtonVisibility();

// Мобильное меню
// Элементы
const mobileMenuToggle = document.querySelector('.header__menu--mobile');
const mobileMenuClose = document.querySelector('.menu__mobile--icon');
const mobileMenu = document.querySelector('.menu__mobile');
const body = document.body;

//Функция открытия меню
function openMenu() {
  mobileMenu.classList.add('active');
  mobileMenu.setAttribute('aria-hidden', 'false');
  mobileMenuToggle.setAttribute('aria-expanded', 'true');

  body.style.overflow = 'hidden';
}

//Функция закрытия меню
function closeMenu() {
  mobileMenu.classList.remove('active');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  body.style.overflow = '';
}

//Открытие меню
mobileMenuToggle?.addEventListener('click', openMenu);

//Закрытие меню
mobileMenuClose?.addEventListener('click', closeMenu);

//Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
    closeMenu();
  }
});

// Проверяем наличие основного элемента
const schemaContainer = document.querySelector('.how-we-work__schema');

if (schemaContainer) {
  const centerElement = schemaContainer.querySelector(
    '.how-we-work__schema--center'
  );

  if (centerElement) {
    function repositionCenterElement() {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Перемещаем элемент в конец контейнера
        schemaContainer.appendChild(centerElement);
      } else {
        // Возвращаем элемент на исходную позицию (между left и right)
        const leftElement = schemaContainer.querySelector(
          '.how-we-work__schema--left'
        );
        const rightElement = schemaContainer.querySelector(
          '.how-we-work__schema--right'
        );

        if (leftElement && rightElement) {
          // Вставляем center между left и right
          rightElement.parentNode.insertBefore(centerElement, rightElement);
        }
      }
    }

    // Вызываем при загрузке страницы
    repositionCenterElement();

    // Вызываем при изменении размера окна
    window.addEventListener('resize', repositionCenterElement);
  }
}
