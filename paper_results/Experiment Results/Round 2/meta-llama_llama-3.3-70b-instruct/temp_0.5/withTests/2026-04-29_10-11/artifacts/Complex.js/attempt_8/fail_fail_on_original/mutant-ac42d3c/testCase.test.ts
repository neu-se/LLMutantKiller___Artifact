import { Complex } from './complex';

describe('Complex.js', () => {
  it('should throw an error when b is -1 in atan for mutated code', () => {
    const c = new Complex(0, -1);
    expect(c.atan().im).not.toBeCloseTo(-Infinity);
  });
});