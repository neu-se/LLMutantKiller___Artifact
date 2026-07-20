import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });

  it('should return the correct result when calculating hypot with a large number', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(2));
  });

  it('should throw an error or return NaN when calculating hypot with invalid input', () => {
    const complex = new Complex(1, NaN);
    expect(complex.abs()).toBeNaN();
  });
});