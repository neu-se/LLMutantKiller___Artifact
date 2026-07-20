import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acsc();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    expect(complex.acsc().re).not.toEqual(complex2.acsc().re);
  });
});