// Modelo de objeto de paginação padrão retornado pela API
export class PaginationModel {
  count: number;
  next: string;
  previous: string;
  results: [];
  constructor(count: number, next: string, previous: string, results: []) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}
