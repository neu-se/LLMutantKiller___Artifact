import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });

  it('should throw an error when calculating hypot with invalid input', () => {
    const complex = new Complex(3, NaN);
    expect(() => complex.abs()).toThrowError();
  });

  it('should return the correct result when calculating hypot with a large number', () => {
    const complex = new Complex(1000000, 1000000);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(2000000000000));
  });
});