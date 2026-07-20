import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when accessing an undefined property', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    expect(() => c1.mul(c2).re).not.toThrow();
    expect(() => c1.mul(c2)[""]).toThrow();
  });
});