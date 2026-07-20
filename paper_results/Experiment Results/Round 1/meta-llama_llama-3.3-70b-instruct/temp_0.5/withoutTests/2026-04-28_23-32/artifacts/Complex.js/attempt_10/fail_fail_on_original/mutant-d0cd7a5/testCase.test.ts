import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    expect(result.im).toBeLessThan(0);
  });
});