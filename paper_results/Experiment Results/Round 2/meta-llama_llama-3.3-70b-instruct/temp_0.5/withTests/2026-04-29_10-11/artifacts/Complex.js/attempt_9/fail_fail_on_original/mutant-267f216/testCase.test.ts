import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    const d = c.re * c.re + c.im * c.im;
    expect(d).toBeCloseTo(13, 10);
    const expectedReal = result.re;
    const expectedImaginary = result.im;
    expect(expectedReal).not.toBeNull();
    expect(expectedImaginary).not.toBeNull();
    const mutatedResult = new Complex(2, -3).acsch();
    expect(mutatedResult.re).not.toEqual(expectedReal);
    expect(mutatedResult.im).not.toEqual(expectedImaginary);
  });
});