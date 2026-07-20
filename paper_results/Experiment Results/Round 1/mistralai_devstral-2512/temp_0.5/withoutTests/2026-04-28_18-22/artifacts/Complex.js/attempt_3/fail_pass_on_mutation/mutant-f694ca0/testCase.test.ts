// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute expm1 for complex numbers with small real parts', () => {
    // Create a complex number with a very small real part to trigger the Taylor series path in cosm1
    const c = new Complex(0.001, 0.001);
    const result = c.expm1();
    // The mutation changes 1/40320 to 1*40320 in the cosm1 function
    // This will cause a significant difference in the result
    // We test the imaginary part which uses cosm1 directly
    expect(result.im).toBeCloseTo(0.0010005, 5);
  });
});