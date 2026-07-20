import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when multiplying two complex numbers with the mutated code', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(4, 0);
    expect(() => c1.mul(c2)).toThrowError();
  });

  it('should correctly multiply two complex numbers with the original code', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(4, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(8);
    expect(result.im).toBeCloseTo(0);
  });
});