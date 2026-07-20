import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('verifies acsc(z) equals asin(1/z) for a complex number', () => {
    // acsc(z) should equal asin(1/z)
    // For z = 3 + 4i: 1/z = (3-4i)/25 = 0.12 - 0.16i
    const z = new Complex(3, 4);
    const acscResult = z.acsc();
    const asinInvResult = z.inverse().asin();
    expect(acscResult.re).toBeCloseTo(asinInvResult.re, 10);
    expect(acscResult.im).toBeCloseTo(asinInvResult.im, 10);
  });
});