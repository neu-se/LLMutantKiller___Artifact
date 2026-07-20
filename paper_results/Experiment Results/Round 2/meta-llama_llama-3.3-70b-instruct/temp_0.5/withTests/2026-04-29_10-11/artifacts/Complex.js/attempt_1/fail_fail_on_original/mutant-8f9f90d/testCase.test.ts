import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(2, 3);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(result.im).toBeCloseTo(-1.209199576946036, 10);
  });
});