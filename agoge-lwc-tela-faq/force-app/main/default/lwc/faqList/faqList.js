import { LightningElement, wire } from 'lwc';
import searchFaqs from '@salesforce/apex/FaqController.searchFaqs';

const PAGE_SIZE = 10;

export default class FaqList extends LightningElement {
  searchTerm = '';
  faqs = [];
  currentPage = 1;
  totalPages = 0;
  searchTimeout;

  @wire(searchFaqs, { searchTerm: '$searchTerm', pageNumber: '$currentPage'})
  wiredFaqs({ error, data }) {
    if (data) {
      this.faqs = data.faqs;
      this.totalPages = Math.ceil(data.totalCount / PAGE_SIZE);
    } else if (error) {
      console.error(error);
    }
  }

  get isFirstPage() {
    return this.currentPage === 1;
  }

  get isLastPage() {
    return this.currentPage === this.totalPages;
  }

  handlePreviousPage() {
    this.currentPage = !this.isFirstPage ? this.currentPage - 1 : this.currentPage;
  }
  
  handleNextPage() {
    this.currentPage = !this.isLastPage ? this.currentPage + 1 : this.currentPage;
  }

  handleSearch(event) {
    clearTimeout(this.searchTimeout);
    const searchValue = event.target.value;

    this.searchTimeout = setTimeout(() => {
      this.searchTerm = searchValue;
      this.currentPage = 1;
    }, 1000);
  }
}
