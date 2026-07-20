import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber1 = new Complex('1+2i');
    const complexNumber2 = new Complex('1-2i');
    expect(complexNumber1.re).toBeCloseTo(complexNumber2.re);
    expect(complexNumber1.im).not.toBeCloseTo(complexNumber2.im);
  });
});