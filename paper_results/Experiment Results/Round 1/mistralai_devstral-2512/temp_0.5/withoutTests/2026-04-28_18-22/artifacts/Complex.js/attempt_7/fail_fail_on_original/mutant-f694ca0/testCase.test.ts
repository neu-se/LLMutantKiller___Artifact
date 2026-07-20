// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute expm1 for small complex numbers', () => {
    // Create a complex number with small real part to trigger Taylor series in cosm1
    const c = new Complex(0.01, 0.01);
    const result = c.expm1();
    // The mutation changes 1/40320 to 1*40320 in the cosm1 calculation
    // This affects the real part calculation: Math.expm1(a) * Math.cos(b) + cosm1(b)
    // For b=0.01, cosm1(0.01) should be approximately -0.00004999998
    // The mutation will make this term much larger, affecting the result
    const expectedReal = Math.expm1(0.01) * Math.cos(0.01) + (Math.pow(0.01, 2) * (Math.pow(0.01, 2) * (Math.pow(0.01, 2) * (Math.pow(0.01, 2) * (Math.pow(0.01, 2) * (Math.pow(0.01, 2) * (Math.pow(0.01, 2) / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});