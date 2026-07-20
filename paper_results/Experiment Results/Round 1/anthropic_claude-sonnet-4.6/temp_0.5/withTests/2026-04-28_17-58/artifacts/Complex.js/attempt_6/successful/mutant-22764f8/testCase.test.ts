import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should return a valid complex number for acot(1)', () => {
    // acot(z) = atan(1/z)
    // acot(1) = atan(1) = pi/4
    const result = new Complex(1, 0).acot();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});