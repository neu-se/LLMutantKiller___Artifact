import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calling clone on the mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => {
      const clone = complex.clone();
      expect(clone.re).toBeUndefined();
      expect(clone.im).toBeUndefined();
    }).toThrowError();
  });
});