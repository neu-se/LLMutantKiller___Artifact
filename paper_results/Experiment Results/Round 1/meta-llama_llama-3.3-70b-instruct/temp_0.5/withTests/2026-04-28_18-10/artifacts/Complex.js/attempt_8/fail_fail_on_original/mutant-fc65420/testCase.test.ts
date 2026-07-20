import { Complex } from '../complex';

describe('Complex', () => {
  it('should return the correct value for acsch when the real part is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should throw an error when the real part is zero for the acsch function in the mutated code', () => {
    const complex = new Complex(0, 1);
    expect(() => complex.acsch()).toThrowError();
  });
});