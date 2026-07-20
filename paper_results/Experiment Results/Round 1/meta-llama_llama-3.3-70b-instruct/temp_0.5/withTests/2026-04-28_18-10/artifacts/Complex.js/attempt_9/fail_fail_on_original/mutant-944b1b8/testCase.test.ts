import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle asec function correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});