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
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
     Account.list(User.current(), (error, response) => {
      
      if (error) {
        throw new Error('error');
      }
      if (response.success) {
        
       let selectLink = this.element.querySelector('select');
         selectLink.innerHTML = response.data.reduce((acc, item) => {
            let el = `<option value = "${item.id}">${item.name}</option>`;
            return acc + el;
          }, "");
      }
    });
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (error) {
        throw new Error('error');
      }
      if (response && response.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      }
    });
  }
}