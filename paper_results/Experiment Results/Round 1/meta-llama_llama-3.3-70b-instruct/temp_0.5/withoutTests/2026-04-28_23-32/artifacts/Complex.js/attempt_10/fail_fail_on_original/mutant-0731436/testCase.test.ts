import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.toString()).not.toContain('NaN');
    expect(result.re).not.toBeCloseTo(0, 10);
  });
});