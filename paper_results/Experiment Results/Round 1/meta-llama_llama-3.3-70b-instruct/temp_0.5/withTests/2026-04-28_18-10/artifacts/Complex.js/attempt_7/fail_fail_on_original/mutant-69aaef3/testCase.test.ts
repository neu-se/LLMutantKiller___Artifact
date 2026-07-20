import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for a = 3 and b = 4', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });

  it('should calculate hypot correctly for a = 1 and b = 1', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(2));
  });

  it('should calculate hypot correctly for a = 0 and b = 1', () => {
    const complex = new Complex(0, 1);
    expect(complex.abs()).toBeCloseTo(1);
  });

  it('should fail when calculating hypot with division by zero in the mutated code', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).not.toBeNaN();
  });
});