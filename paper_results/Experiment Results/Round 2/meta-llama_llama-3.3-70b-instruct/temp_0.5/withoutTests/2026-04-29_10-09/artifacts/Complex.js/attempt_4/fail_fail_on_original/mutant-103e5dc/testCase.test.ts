import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    expect(csc.re).toBeCloseTo(0.6215180171704285);
    expect(csc.im).toBeCloseTo(-0.6215180171704285);
    const complex2 = new Complex(1, 2);
    const csc2 = complex2.csc();
    expect(csc2.re).toBeCloseTo(csc2.re);
    expect(csc2.im).toBeCloseTo(csc2.im);
    expect(csc2.re).not.toBeCloseTo(csc.re / 2);
  });
});