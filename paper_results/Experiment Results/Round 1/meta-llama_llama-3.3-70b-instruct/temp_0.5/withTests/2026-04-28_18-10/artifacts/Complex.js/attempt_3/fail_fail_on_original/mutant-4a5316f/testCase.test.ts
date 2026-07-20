import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth when b is positive', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });

  it('should return the correct result for acoth when b is negative', () => {
    const complex = new Complex(0, -1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });

  it('should return the correct result for acoth with the mutation', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(complex.re, complex.im).acoth();
    const resultMutated = new Complex(complex.re, -complex.im).acoth();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});