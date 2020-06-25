import { ReferenceModel } from './reference.model';

// Modelo de objeto de paginação padrão retornado pela API
export class PaginationModel {
  count: number;
  next: string;
  previous: string;
  results: ReferenceModel[];
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.results = [];
    input['results'].forEach((reference: ReferenceModel) => {
      this.results.push(new ReferenceModel().deserialize(reference));
    });
    return this;
  }
}
