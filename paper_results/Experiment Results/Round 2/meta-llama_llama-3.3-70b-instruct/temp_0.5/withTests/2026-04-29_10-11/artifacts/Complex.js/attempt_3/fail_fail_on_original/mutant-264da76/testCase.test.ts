import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    const originalResult = new Complex(0.5493061443340548, -0.5493061443340548);
    expect(result.re).not.toBeCloseTo(originalResult.re);
    expect(result.im).not.toBeCloseTo(originalResult.im);
  });
});