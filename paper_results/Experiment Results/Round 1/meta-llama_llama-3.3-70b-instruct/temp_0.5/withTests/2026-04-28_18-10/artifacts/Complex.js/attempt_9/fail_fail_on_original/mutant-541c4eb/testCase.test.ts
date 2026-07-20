import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should return a valid result when calculating asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).toBeDefined();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
  });
});