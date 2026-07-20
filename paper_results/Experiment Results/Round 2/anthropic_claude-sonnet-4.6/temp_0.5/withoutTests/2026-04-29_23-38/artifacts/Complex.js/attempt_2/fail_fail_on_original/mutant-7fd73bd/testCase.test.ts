import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('should correctly compute asin of a complex number', () => {
    const z = new Complex(2, 0);
    const result = z.asin();
    // asin(2) = pi/2 - i*log(2 + sqrt(3))
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
  });
});