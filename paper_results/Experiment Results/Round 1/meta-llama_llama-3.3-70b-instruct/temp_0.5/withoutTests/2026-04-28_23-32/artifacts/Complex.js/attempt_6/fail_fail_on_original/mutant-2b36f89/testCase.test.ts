import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    const expectedRe = 0.8686709614860094;
    const expectedIm = -0.25534194707848504;
    expect(csc.re).toBeCloseTo(expectedRe);
    expect(csc.im).toBeCloseTo(expectedIm);
  });
});