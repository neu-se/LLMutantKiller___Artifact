import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cos(x) - 1 for small x', () => {
    const x = 0.0001;
    const result = new Complex(x).expm1();
    const expected = new Complex(Math.expm1(x) * Math.cos(x) + Math.cos(x) - 1, Math.exp(x) * Math.sin(x));
    expect(result.equals(expected)).toBe(true);
  });
});