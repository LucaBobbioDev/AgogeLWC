import { LightningElement, wire } from 'lwc';
import searchFaqs from '@salesforce/apex/FaqController.searchFaqs';

const PAGE_SIZE = 10;

export default class FaqList extends LightningElement {
  searchTerm = '';
  faqs = [];
  currentPage = 1;
  searchTimeout;

  @wire(searchFaqs, { searchTerm: '$searchTerm' })
  wiredFaqs({ error, data }) {
    if (data) {
      this.faqs = data;
      this.currentPage = 1;
    } else if (error) {
      console.error(error);
    }
  }

  get totalPages() {
    return Math.ceil(this.faqs.length / PAGE_SIZE);
  }

  get isFirstPage() {
    return this.currentPage === 1;
  }

  get isLastPage() {
    return this.currentPage === this.totalPages;
  }

  get paginatedFaqs() {
    const startIndex = (this.currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return this.faqs.slice(startIndex, endIndex);
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
