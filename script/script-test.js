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

//Закр
