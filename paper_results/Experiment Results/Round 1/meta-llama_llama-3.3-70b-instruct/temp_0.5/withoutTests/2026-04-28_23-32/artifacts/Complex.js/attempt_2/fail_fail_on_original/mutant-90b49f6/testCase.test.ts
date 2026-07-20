import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should handle the parsing of complex numbers correctly', () => {
    const complexNumber = new Complex('2+3i');
    expect(complexNumber.re).toBe(2);
    expect(complexNumber.im).toBe(3);
    const complexNumber2 = new Complex('2-3i');
    expect(complexNumber2.re).toBe(2);
    expect(complexNumber2.im).toBe(-3);
    const complexNumber3 = new Complex('2+3i -1');
    expect(complexNumber3.re).toBe(1);
    expect(complexNumber3.im).toBe(3);
  });
});