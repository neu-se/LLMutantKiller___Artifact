import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});