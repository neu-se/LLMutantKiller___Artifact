import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acsch when b is not zero', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Infinity, 10);
  });

  it('should throw an error when b is zero in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrow();
  });
});