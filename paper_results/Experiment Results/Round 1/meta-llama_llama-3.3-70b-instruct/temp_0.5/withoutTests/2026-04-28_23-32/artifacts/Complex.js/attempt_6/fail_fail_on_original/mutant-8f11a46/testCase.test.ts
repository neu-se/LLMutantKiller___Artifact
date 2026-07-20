import { Complex } from "../complex";

describe('Complex', () => {
  it('should parse complex number from string correctly', () => {
    const complexNumber = new Complex('3');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(0);
    const complexNumber2 = new Complex('3+4i');
    expect(complexNumber2.re).toBe(3);
    expect(complexNumber2.im).toBe(4);
    const complexNumber3 = new Complex('a');
    expect(complexNumber3.re).toBeNaN();
    expect(complexNumber3.im).toBeNaN();
  });
});