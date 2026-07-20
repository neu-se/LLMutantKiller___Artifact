import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating acoth with mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => {
      const result = complex.acoth();
      expect(result.re).toBeNaN();
      expect(result.im).toBeNaN();
    }).toThrowError();
  });
});