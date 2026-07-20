import { Complex } from "./complex";

describe('Complex.js', () => {
  it('should return the correct acosh value', () => {
    const complex = new Complex(1, 1);
    const acoshValue = complex.acosh();
    expect(acoshValue.im).toBeLessThan(0);
  });
});