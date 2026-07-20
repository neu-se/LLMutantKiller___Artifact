import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+Stryker was here!i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBeNaN();
  });
});