/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    // this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      function getListAccount(option) {
        if (document.querySelectorAll(`#new-${option}-form option`)) {
          Array.from(document.querySelectorAll(`#new-${option}-form option`)).forEach(elem => elem.remove());
        }
        Account.list(User.current(), ( err, response ) => {
          if (response.success) {
            let selectIncome = document.querySelector(`#${option}-accounts-list`);
            if (!document.querySelector(`#${option}-accounts-list option`)) {
              response.data.forEach((elem) => {
                const optionText = `<option value="${elem.id}">${elem.name}</option>`
                selectIncome.insertAdjacentHTML('beforeEnd', optionText);
              });
            }
          }
        });
      }
      
      const buttonCreateIncome = document.querySelector('.create-income-button');
      const buttonCreateExpense = document.querySelector('.create-expense-button');
     
      if (this.element.getAttribute('id') === 'new-income-form') {
        buttonCreateIncome.addEventListener('click', () => getListAccount('income'));
      }

      if (this.element.getAttribute('id') === 'new-expense-form') {
        buttonCreateExpense.addEventListener('click', () => getListAccount('expense'));
      }
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, ( err, response ) => {
      if (response.success) {
        this.element.reset();
        let boxFormAttribute = this.element.closest('.modal').getAttribute('id');
        if (boxFormAttribute === 'modal-new-income') {
          App.getModal('newIncome').close();
        }
        if (boxFormAttribute === 'modal-new-expense') {
          App.getModal('newExpense').close();
        }
        App.update();
      }
    });
  }
}