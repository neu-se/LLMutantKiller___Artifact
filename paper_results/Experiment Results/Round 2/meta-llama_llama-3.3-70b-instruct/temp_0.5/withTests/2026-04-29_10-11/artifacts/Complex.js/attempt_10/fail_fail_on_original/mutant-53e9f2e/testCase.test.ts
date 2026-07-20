import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate atanh for the value 1.5', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    const expectedRe = 0.5493061443340549;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});