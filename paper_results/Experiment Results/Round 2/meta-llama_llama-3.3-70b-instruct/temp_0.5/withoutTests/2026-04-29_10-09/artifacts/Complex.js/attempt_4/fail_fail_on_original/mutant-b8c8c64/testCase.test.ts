import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when multiplying two complex numbers with invalid property access', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    expect(() => {
      const result = c1.mul(c2);
      // The mutation changes the property access to this[""] which is undefined
      // So, we expect the result to be NaN
      expect(result.re).not.toBeNaN();
    }).toThrowError();
  });
});