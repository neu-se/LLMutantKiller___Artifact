import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when calling sech on the original code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.sech()).not.toThrow();
  });
});