import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.1 (within Taylor series range)", () => {
    // Create a complex number with imaginary part 0.1
    // This will trigger the cosm1 function in the expm1 calculation
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    // For x=0.1, cosm1(0.1) should be approximately -0.004997916927067836
    // The mutation changes division to multiplication, which would produce a very different result
    // The real part of expm1(0 + 0.1i) should be: expm1(0)*cos(0.1) + cosm1(0.1) = 0 + cosm1(0.1)
    expect(result.re).toBeCloseTo(-0.004997916927067836, 10);
  });
});