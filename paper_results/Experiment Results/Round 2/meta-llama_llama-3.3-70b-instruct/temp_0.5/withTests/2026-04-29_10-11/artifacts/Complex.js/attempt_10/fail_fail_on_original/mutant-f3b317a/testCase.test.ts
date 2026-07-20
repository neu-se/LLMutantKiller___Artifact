import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return a complex number when a and b are not 0 in asec', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result).toBeDefined();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});