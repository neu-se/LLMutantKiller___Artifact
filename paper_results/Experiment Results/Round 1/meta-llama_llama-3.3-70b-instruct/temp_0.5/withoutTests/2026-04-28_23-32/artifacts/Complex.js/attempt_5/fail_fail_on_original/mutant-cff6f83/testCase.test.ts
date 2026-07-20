import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    const expectedReal = result.re;
    const expectedImaginary = result.im;
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
  });
});