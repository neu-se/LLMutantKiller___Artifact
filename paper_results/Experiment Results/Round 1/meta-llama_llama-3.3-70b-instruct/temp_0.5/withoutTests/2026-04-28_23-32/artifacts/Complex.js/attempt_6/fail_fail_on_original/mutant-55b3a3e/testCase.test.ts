import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a non-zero and b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).not.toBeCloseTo(Infinity, 10);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acsc();
    expect(result2.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result2.im).toBeCloseTo(Infinity, 10);
  });
});