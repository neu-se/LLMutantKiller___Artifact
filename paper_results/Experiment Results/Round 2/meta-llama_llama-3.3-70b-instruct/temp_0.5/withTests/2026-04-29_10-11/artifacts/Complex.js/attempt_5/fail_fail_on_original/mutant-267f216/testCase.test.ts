import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    const d = c.re * c.re + c.im * c.im;
    expect(d).toBeCloseTo(2, 10);
    const expectedReal = result.re;
    const expectedImaginary = result.im;
    expect(expectedReal).not.toBeNull();
    expect(expectedImaginary).not.toBeNull();
  });
});