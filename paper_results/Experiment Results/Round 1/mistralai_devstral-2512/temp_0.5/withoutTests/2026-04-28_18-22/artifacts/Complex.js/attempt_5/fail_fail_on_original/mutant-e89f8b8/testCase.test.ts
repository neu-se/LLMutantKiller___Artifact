import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a complex number with equal real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The mutation changes division to multiplication in the imaginary part calculation
    // This will cause a significant difference in the result
    expect(result.re).toBeCloseTo(0.6215180171704285, 10);
    expect(result.im).toBeCloseTo(-0.3039251953014297, 10);
  });
});