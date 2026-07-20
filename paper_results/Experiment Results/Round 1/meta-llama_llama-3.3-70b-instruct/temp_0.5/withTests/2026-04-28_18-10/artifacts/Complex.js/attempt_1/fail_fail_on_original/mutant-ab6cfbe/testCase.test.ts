import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the log of a complex number correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);

    const complex2 = new Complex(-1, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(Math.PI);
  });
});