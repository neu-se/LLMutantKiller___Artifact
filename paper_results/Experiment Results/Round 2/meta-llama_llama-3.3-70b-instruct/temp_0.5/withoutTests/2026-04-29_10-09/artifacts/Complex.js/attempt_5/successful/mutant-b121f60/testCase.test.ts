import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.2e-34i');
    expect(complexNumber.re).toBe(0);
    expect(complexNumber.im).toBeCloseTo(1.2 * Math.pow(10, -34));
  });
});