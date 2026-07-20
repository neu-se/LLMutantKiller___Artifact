import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.im).toBeCloseTo(Infinity, 0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asec();
    expect(result2.im).toBeCloseTo(Infinity, 0);
  });
});