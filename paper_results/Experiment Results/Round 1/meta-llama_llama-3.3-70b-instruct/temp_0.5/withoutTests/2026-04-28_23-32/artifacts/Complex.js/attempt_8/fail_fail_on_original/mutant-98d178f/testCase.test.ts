import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when atanh is called with a complex number that has an invalid property', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.im).not.toBeNaN();
    expect(() => {
      const complex2 = new Complex(1);
      complex2[""] = undefined;
      complex2.atanh();
    }).not.toThrow();
  });
});