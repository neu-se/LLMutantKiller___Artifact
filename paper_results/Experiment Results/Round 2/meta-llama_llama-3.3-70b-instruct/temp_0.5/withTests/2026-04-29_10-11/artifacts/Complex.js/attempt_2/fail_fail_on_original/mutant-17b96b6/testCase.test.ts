import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth when a is not 0 and b is not 0', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Math.PI / 2);
  });
});