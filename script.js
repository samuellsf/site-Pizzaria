// Seletor de elementos
const menuContent = document.querySelector('.content');
const menuToggle = menuContent?.querySelector('.menu-toggle');

// Função para alternar menu
const toggleMenu = (evento) => {
  const showMenu = menuContent.classList.contains('on');
  document.body.style.overflow = showMenu ? 'initial' : 'hidden';
  menuContent.classList.toggle('on');
};

// Adicionar evento de clique
if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}


