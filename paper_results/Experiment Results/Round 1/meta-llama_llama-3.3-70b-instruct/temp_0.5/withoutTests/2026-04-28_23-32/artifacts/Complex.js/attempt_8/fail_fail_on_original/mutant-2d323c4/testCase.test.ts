import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acsch();
    expect(result2.re).toBeNaN();
    expect(result2.im).toBeNaN();
  });
});