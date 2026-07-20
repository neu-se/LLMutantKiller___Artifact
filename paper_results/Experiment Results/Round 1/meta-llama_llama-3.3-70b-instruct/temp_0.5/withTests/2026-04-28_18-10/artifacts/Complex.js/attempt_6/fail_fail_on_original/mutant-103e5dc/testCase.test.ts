import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const expected = 1 / (complex.sin().re + complex.sin().im * Math.sqrt(-1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});