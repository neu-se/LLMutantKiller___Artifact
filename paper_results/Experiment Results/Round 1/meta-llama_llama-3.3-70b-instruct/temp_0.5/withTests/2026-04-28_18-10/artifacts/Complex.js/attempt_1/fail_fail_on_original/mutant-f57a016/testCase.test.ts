import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('3-i');
    expect(c.re).toBeCloseTo(3, 15);
    expect(c.im).toBeCloseTo(-1, 15);
  });
});