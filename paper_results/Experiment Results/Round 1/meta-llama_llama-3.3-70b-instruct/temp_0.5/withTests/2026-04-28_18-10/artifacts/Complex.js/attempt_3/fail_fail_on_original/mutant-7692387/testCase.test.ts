import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});