import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    const expected = new Complex(-2.094712961275659, -0.46364760900080615);
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});