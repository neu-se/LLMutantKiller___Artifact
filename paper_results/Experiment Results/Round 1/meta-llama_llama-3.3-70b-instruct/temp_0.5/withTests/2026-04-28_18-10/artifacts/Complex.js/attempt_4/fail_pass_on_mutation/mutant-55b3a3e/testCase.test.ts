import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the complex arcus cosecans for zero real part and zero imaginary part', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBeCloseTo(Infinity);
  });
});