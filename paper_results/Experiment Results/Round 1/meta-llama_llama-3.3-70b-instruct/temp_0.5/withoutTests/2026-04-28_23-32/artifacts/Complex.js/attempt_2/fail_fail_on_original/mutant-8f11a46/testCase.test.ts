import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should parse complex number from string correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const complexNumber2 = new Complex('1');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(0);
  });
});