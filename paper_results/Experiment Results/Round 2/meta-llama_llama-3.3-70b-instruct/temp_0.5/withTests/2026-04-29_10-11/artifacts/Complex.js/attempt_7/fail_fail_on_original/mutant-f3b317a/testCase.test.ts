import { Complex } from '../complex';

describe('Complex', () => {
  it('should return a complex number when a and b are 0 in asec', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(Infinity);
  });
});