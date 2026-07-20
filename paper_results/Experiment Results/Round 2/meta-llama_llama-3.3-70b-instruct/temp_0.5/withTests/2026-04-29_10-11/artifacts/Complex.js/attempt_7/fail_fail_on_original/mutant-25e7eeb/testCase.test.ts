import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly multiply two complex numbers when both are real', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(6);
    expect(result.im).toBeCloseTo(0);
  });

  it('should throw an error when accessing an undefined property', () => {
    const c1 = new Complex(2, 0);
    expect(() => c1.mul(c1["undefinedProperty"])).toThrowError();
  });
});