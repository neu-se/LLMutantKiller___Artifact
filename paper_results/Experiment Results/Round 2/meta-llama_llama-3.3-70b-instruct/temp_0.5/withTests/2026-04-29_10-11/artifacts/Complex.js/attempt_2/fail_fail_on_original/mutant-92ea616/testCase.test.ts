import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.7853981633974483, 5);
    expect(result.im).toBeCloseTo(-0.2553419470788943, 5);
  });
});