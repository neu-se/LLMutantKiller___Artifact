import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const complex = new Complex(-1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.9463097366024018);
    expect(result.im).toBeCloseTo(0);
  });
});