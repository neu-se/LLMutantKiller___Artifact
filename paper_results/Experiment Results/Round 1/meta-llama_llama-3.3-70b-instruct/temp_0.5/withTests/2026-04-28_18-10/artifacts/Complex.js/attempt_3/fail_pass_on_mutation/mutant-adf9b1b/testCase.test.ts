import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate expm1 for small x', () => {
    const x = new Complex(0.0001, 0);
    const result = x.expm1();
    const expected = new Complex(Math.expm1(0.0001), 0);
    expect(result.equals(expected)).toBe(true);
  });
});