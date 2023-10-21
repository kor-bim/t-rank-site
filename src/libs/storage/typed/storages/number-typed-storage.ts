import { TypedStorage } from './typed-storage'

export class NumberTypedStorage extends TypedStorage<number> {
  public increase(offset: number = 1): void {
    const value = this.get() ?? 0
    this.set(value + offset)
  }

  public decrease(offset: number = 1): void {
    const value = this.get() ?? 0
    this.set(value - offset)
  }
}
