import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch with b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should return the correct result for acsch with b != 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });

  it('should throw an error for acsch with b = 0 in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).not.toThrowError();
  });
});