import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acsch();
    expect(result2.re).toBeCloseTo(Infinity, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    const complex3 = new Complex(0, 0);
    const result3 = complex3.acsch();
    expect(result3.re).toBeCloseTo(Infinity, 10);
    expect(result3.im).toBeCloseTo(0, 10);
    expect(complex3.acsch().re).not.toBeCloseTo(0, 10);
  });
});