export class MysqlProxy<T> {
  constructor(private readonly repository: T) {}
  getInstance(): T {
    return this.repository;
  }
}
