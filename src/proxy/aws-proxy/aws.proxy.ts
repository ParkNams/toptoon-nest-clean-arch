export class AwsProxy<T> {
  constructor(private readonly instance: T) {}
  getInstance(): T {
    return this.instance;
  }
}
