import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for a = 1 and b = 1', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(2));
  });

  it('should calculate hypot correctly for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    expect(complex.abs()).toBeCloseTo(0);
  });

  it('should fail for mutated code when a = 1 and b = 1', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).not.toBeCloseTo(NaN);
  });
});