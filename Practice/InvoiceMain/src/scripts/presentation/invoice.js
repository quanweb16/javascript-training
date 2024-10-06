import Template from '../helpers/template.js';
import ModelPresentation from './modal.js';

class InvoicePresentation {
  constructor(invoiceBusiness) {
    this.invoiceBusiness = invoiceBusiness;
    this.modal = new ModelPresentation(this.invoiceBusiness);
  }

  init() {
    // Initial elements
    this.invoiceList = document.querySelector('.invoices .invoice-list .table-list-invoice');
    this.editInvoiceEl = '.edit-invoice-btn';
    this.deleteInvoiceEl = '.delete-invoice-btn';
    this.checkboxHeaderGrid = document.querySelector('.header-item.checkbox-header');
    this.searchGird = document.querySelector('.search-container');
    this.deleteAllGird = document.querySelector('.header-item.trash-header');
    this.selectAllEls = this.checkboxHeaderGrid.querySelectorAll('.invoice-checkbox-all');
    this.searchInputEl = this.searchGird.querySelector('.search-input');
    this.searchButtonEl = this.searchGird.querySelector('.search-button');
    this.deleteAllEl = this.deleteAllGird.querySelector('.delete-all');
    this.setupActionMenuToggle();
    this.addSelectAllEvent();
    this.addDeleteAllEvent();
    this.showInvoices();
    this.addEditInvoiceEvent();
    this.addDeleteInvoiceEvent();
    this.addSearchEvent();
    this.modal.init();
  }

  showInvoices() {
    const data = this.invoiceBusiness.getInvoices();
    this.addInvoiceToList(data);
  }

  setupActionMenuToggle() {
    this.invoiceList.addEventListener('click', (event) => {
      const dotsButton = event.target.closest('.dots');
      if (dotsButton) {
        this.invoiceList.querySelectorAll('.button-action').forEach((btn) => (btn.style.display = 'none'));
        const buttonAction = dotsButton.closest('.action').querySelector('.button-action');
        buttonAction.style.display = 'block';
      }
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.action')) {
        this.invoiceList.querySelectorAll('.button-action').forEach((btn) => (btn.style.display = 'none'));
      }
    });
  }

  addEditInvoiceEvent() {
    this.invoiceList.addEventListener('click', (event) => {
      if (!event.target.closest(this.editInvoiceEl)) return;
      const tableItem = event.target.closest('.table-item');
      const id = tableItem.getAttribute('data-id');
      this.openEditModal(id);
      const buttonAction = tableItem.querySelector('.button-action');
      if (buttonAction) {
        buttonAction.style.display = 'none';
      }
    });
  }

  addDeleteInvoiceEvent() {
    this.invoiceList.addEventListener('click', (event) => {
        if (!event.target.closest(this.deleteInvoiceEl)) return;
        const tableItem = event.target.closest('.table-item');
        const id = tableItem.getAttribute('data-id');           
        this.openDeleteModal(id);
        const buttonAction = tableItem.querySelector('.button-action');
        if (buttonAction) {
            buttonAction.style.display = 'none';
        }
    });
  }

  addSelectAllEvent() {
    this.selectAllEls.forEach(selectAllEl => {
        selectAllEl.addEventListener('change', (event) => {
            const isChecked = event.target.checked;
            const checkboxes = this.invoiceList.querySelectorAll('.invoice-checkbox');
            checkboxes.forEach((checkbox) => {
                checkbox.checked = isChecked;
            });
        });
    });
}

  addDeleteAllEvent() {
    this.deleteAllEl.addEventListener('click', () => {
      const selectedCheckboxes = this.invoiceList.querySelectorAll('.invoice-checkbox:checked');
      if (selectedCheckboxes.length === 0) {
        this.modal.openNotificationDelete();
        return;
      }
      this.modal.openDeleteAllInvoiceModal();
    });
  }

  addSearchEvent() {
    this.searchButtonEl.addEventListener('click', () => this.performSearch());
    this.searchInputEl.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.performSearch();
      }
      if (this.searchInputEl.value.trim() === '') {
        this.showInvoices();
      }
    });
  }

  performSearch() {
    const query = this.searchInputEl.value;
    console.log('Search Query:', query);
    const filteredInvoices = this.invoiceBusiness.searchInvoices(query);
    console.log('Filtered Invoices:', filteredInvoices);
    this.displaySearchInvoices(filteredInvoices);
  }

  displaySearchInvoices(filteredData = null) {
    const data = filteredData || this.invoiceBusiness.getInvoices();
    this.addInvoiceToList(data);
  }

  openDeleteAllModal() {
    this.modal.openDeleteAllInvoiceModal();
  }

  openDeleteModal(id) {
    const data = this.invoiceBusiness.getInvoiceById(id);
    this.modal.openDeleteInvoiceModal(data);
  }

  openEditModal(id) {
    const data = this.invoiceBusiness.getInvoiceById(id);
    this.modal.openEditInvoiceModal(data);
  }

  addInvoiceToList(data) {
    const template = Template.buildInvoices(data);
    this.invoiceList.innerHTML = template;
  }
}

export default InvoicePresentation;
