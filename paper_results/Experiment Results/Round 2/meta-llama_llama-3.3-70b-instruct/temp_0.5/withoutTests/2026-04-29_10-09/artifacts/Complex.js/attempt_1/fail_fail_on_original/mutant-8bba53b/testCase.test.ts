import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly', () => {
    const x = 0.1;
    const expected = Math.cos(x) - 1;
    const complex = new Complex(x);
    const result = complex.exp().sub(1).re;
    expect(result).toBeCloseTo(expected);
  });
});