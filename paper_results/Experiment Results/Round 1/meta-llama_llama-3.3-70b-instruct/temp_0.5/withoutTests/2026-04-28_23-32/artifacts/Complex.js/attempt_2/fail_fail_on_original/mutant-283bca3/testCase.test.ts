import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acsc();
    const originalRe = resultOriginal.re;
    const originalIm = resultOriginal.im;

    const mutatedComplex = new Complex(1, -1);
    const resultMutated = mutatedComplex.acsc();
    const mutatedRe = resultMutated.re;
    const mutatedIm = resultMutated.im;

    expect(originalRe).not.toBeCloseTo(mutatedRe);
    expect(originalIm).not.toBeCloseTo(mutatedIm);
  });
});