import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.7853981633974483);
    expect(result.im).toBeCloseTo(-0.36369933964119064);
  });
});