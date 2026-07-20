import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    const expectedReal = -0.46364760900080615;
    const expectedImaginary = 0.46364760900080615;
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
  });
});