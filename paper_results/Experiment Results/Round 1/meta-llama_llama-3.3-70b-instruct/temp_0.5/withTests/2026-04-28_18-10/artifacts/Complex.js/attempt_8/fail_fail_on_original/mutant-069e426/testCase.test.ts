import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.im).toBeCloseTo(Infinity, 0);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.asec();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    const complex3 = new Complex(0, 1);
    const result3 = complex3.asec();
    expect(result3.re).toBeCloseTo(0, 10);
    expect(result3.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});