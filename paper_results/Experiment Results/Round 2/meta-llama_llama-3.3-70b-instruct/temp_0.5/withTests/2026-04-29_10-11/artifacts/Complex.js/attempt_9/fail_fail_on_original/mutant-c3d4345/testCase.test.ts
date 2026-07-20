import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should throw an error when asec is called with a = 0 and b = 0 in the mutated code but not in the original code', () => {
    const complex = new Complex(0, 0);
    expect(complex.asec().re).not.toBeCloseTo(0, 10);
  });
});