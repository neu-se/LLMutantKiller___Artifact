import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(0, 1);
    const resultOriginal = new Complex(0, 1).asec();
    const resultMutated = complex.asec();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});