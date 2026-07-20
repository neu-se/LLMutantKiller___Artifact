import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc computed via asin of inverse matches direct computation', () => {
    // For z = 3 + 4i, acsc(z) = asin(1/z)
    // 1/(3+4i) = (3-4i)/25 = 0.12 - 0.16i
    const z = new Complex(3, 4);
    const acscResult = z.acsc();
    const asinInverseResult = z.inverse().asin();
    expect(acscResult.re).toBeCloseTo(asinInverseResult.re, 10);
    expect(acscResult.im).toBeCloseTo(asinInverseResult.im, 10);
  });
});