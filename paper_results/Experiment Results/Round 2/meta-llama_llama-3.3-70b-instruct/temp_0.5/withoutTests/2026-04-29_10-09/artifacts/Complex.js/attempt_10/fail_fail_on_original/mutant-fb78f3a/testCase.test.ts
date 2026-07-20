import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });

  it('should throw an error when a is not zero in the mutated code', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.asec()).toThrowError();
  });
});