import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });

  it('should calculate hypot correctly for a = 1 and b = 1', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(2));
  });

  it('should not be NaN when calculating hypot', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).not.toBeNaN();
  });
});