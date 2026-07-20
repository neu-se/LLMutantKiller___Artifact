import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings with correct sign handling', () => {
    const complexNumber1 = new Complex('1+2i');
    const complexNumber2 = new Complex('1-2i');
    expect(complexNumber1.re).toBeCloseTo(complexNumber2.re);
    expect(complexNumber1.im).not.toBeCloseTo(complexNumber2.im);
    const complexNumber3 = new Complex('-1+2i');
    expect(complexNumber3.re).toBeCloseTo(-1);
    expect(complexNumber3.im).toBeCloseTo(2);
    const complexNumber4 = new Complex('3-4i');
    expect(complexNumber4.re).toBeCloseTo(3);
    expect(complexNumber4.im).toBeCloseTo(-4);
  });
});