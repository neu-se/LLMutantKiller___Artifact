import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 2);
    const csc = complex.csc();
    expect(csc.re).toBeCloseTo(0.2178242038042684);
    expect(csc.im).toBeCloseTo(-0.2351948179237916);
  });
});