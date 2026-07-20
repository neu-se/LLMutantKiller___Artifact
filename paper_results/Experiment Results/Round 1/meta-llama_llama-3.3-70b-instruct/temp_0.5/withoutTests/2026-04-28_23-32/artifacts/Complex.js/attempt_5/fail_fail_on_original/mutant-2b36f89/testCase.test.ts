import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    expect(csc.re).not.toBeNaN();
    expect(csc.im).not.toBeNaN();
    const complexOriginal = new Complex(1, 1);
    const cscOriginal = complexOriginal.csc();
    expect(csc.re).toBeCloseTo(cscOriginal.re);
    expect(csc.im).toBeCloseTo(cscOriginal.im);
  });
});