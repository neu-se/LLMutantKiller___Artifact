import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc with a = 1 and b = 1', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const expectedReal = -0.46364760900080615;
    const expectedImaginary = 0.46364760900080615;
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});