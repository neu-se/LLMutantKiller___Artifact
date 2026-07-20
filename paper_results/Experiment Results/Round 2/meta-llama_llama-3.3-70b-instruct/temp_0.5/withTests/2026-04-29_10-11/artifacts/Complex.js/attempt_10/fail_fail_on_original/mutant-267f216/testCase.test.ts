import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    const expectedReal = result.re;
    const expectedImaginary = result.im;
    expect(expectedReal).not.toBeNull();
    expect(expectedImaginary).not.toBeNull();
    const d = c.re * c.re + c.im * c.im;
    expect(d).toBeCloseTo(5, 10);
    const mutatedResult = new Complex(1, -2).acsch();
    expect(mutatedResult.re).toBeCloseTo(expectedReal, 10);
    expect(mutatedResult.im).toBeCloseTo(-expectedImaginary, 10);
  });
});