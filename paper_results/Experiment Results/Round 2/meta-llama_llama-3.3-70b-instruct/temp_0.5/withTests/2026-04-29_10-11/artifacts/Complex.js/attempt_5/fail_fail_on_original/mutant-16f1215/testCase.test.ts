import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly for non-zero values', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(complex.acsc().re).not.toBeNaN();
    expect(complex.acsc().im).not.toBeNaN();
    expect(complex.acsc().re).not.toBe(Infinity);
    expect(complex.acsc().im).not.toBe(Infinity);
    expect(complex.acsc().re).not.toBe(-Infinity);
    expect(complex.acsc().im).not.toBe(-Infinity);
  });
});