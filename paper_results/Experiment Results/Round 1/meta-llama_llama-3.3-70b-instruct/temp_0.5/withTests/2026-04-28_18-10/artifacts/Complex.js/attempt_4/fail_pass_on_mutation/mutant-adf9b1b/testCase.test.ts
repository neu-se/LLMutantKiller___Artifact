import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate expm1 for small x and small imaginary part', () => {
    const x = new Complex(0.0001, 0.0001);
    const result = x.expm1();
    const expected = new Complex(Math.expm1(0.0001) * Math.cos(0.0001) + Math.cos(0.0001) - 1, Math.exp(0.0001) * Math.sin(0.0001));
    expect(result.equals(expected)).toBe(true);
  });
});