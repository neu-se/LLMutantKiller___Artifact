import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers with "I" notation', () => {
    const c = new Complex('3+I');
    expect(c.re).toBeCloseTo(3, 10);
    expect(c.im).toBeCloseTo(1, 10);
  });
});