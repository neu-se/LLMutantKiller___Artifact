import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result).toBeDefined();
  });
});