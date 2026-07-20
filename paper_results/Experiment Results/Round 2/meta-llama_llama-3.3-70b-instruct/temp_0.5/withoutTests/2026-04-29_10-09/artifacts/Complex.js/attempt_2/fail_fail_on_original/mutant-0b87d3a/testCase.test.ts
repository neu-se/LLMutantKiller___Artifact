import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly for non-zero values', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.acsc().re).not.toEqual(complex.acsc().im);
  });

  it('should throw an error when calculating acsc for zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).toThrowError();
  });
});