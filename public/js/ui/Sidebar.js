/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const bodyElem = document.querySelector('body');
    const buttonSidebarToggle = document.querySelector('.sidebar-toggle');

    buttonSidebarToggle.addEventListener('click', () => {
      bodyElem.classList.toggle('sidebar-open');
      bodyElem.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {

    const buttonRegister = document.querySelector('.menu-item_register a');
    buttonRegister.addEventListener('click', () => App.getModal('register').open());
    
    const buttonLogin = document.querySelector('.menu-item_login a');
    buttonLogin.addEventListener('click', () => App.getModal('login').open());

    const buttonLogout = document.querySelector('.menu-item_logout a');
    buttonLogout.addEventListener('click', () => {
      User.logout(( err, response ) => {
        if (response.success) {
          App.setState( 'init' );
        }
      });
    });
  }
}