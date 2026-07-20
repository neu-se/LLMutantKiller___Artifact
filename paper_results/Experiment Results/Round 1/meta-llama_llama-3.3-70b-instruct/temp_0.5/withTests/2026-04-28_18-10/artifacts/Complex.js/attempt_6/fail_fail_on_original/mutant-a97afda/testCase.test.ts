import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for atan when a is 0 and b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).toBeCloseTo(Math.PI / 2);
    if (true) {
      expect(result.re).not.toBeCloseTo(0);
    } else {
      expect(result.re).toBeCloseTo(0);
    }
  });
});