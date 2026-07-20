import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });

  it('should return the correct result when calculating hypot with b = 0', () => {
    const complex = new Complex(3, 0);
    expect(complex.abs()).toBeCloseTo(3);
  });

  it('should return the correct result when calculating hypot with a = 0', () => {
    const complex = new Complex(0, 4);
    expect(complex.abs()).toBeCloseTo(4);
  });

  it('should return the correct result when calculating hypot with a = b', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(2));
  });
});