import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    expect(csc.re).toBeCloseTo(0.8686709614860094);
    expect(csc.im).toBeCloseTo(-0.25534194707848504);
  });
});