/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (this.element) {
      this.registerEvents();
    } else {
      throw new Error('Передан пустой элемент');
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    // Кнопка доход
    const buttonCreateIncome = this.element.querySelector('.create-income-button');
    buttonCreateIncome.onclick = () => App.getModal('newIncome').open();

    // Кнопка расход
    const buttonCreateExpense = this.element.querySelector('.create-expense-button');
    buttonCreateExpense.onclick = () => App.getModal('newExpense').open();
  }
}
