import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot with tiny values', () => {
  it('should return finite result for very small complex number where d underflows to zero', () => {
    // With a = 1e-200, b = 1e-200: d = a*a + b*b = 2e-400 which underflows to 0
    // Original: (a !== 0) ? a/0 : 0 => Infinity (since a != 0)
    // Mutated:  (a === 0) ? a/0 : 0 => 0 (since a != 0, returns 0)
    const result = new Complex(1e-200, 1e-200).acot();
    // Original produces Infinity in re part after atan(), mutated produces different result
    expect(result.re).not.toBeNaN();
    // The real part should be atan of Infinity which is pi/2
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
  });
});