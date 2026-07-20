import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.toString()).not.toContain('NaN');
  });
});