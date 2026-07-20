import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('3+4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
  });

  it('should correctly handle parsing with the mutated code', () => {
    const complexNumber = new Complex('3+Stryker was here!i');
    expect(complexNumber.re).toBe(0);
    expect(complexNumber.im).toBeNaN();
  });
});