import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct acsch value', () => {
    const complex = new Complex(1, 2);
    const acsch = complex.acsch();
    expect(acsch.re).toBeCloseTo(-0.48121182505960347);
    expect(acsch.im).toBeCloseTo(-0.8964760208795108);
  });
});