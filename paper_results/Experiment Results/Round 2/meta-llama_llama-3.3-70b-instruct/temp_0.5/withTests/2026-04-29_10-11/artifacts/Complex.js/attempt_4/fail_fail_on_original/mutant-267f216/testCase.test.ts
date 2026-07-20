import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    const expectedReal = result.re;
    const expectedImaginary = result.im;
    expect(expectedReal).not.toBeNull();
    expect(expectedImaginary).not.toBeNull();
    const mutatedResult = new Complex(1, -1).acsch();
    expect(mutatedResult.re).not.toEqual(expectedReal);
    expect(mutatedResult.im).not.toEqual(expectedImaginary);
  });
});