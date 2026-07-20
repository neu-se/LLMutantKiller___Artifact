import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });

  it('should fail when calculating hypot with division by zero in the mutated code', () => {
    const complex = new Complex(1, 1);
    const originalHypot = Math.sqrt(1 + 1);
    expect(complex.abs()).toBeCloseTo(originalHypot);
  });
});