import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    expect(csc.re).toBeCloseTo(-0.2712717081829577);
    expect(csc.im).toBeCloseTo(0.2712717081829577);
  });
});