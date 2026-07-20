import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch()", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number", () => {
    const z = new Complex(1, 1);
    const result = z.csch();

    // The mutation changes division to multiplication in the imaginary component
    // This test checks the relationship between real and imaginary components
    // which will be broken by the mutation

    // For csch(z), the components should satisfy:
    // re^2 + im^2 = 1/(sinh^2(a) + sin^2(b))
    // This relationship will be violated if division becomes multiplication

    const a = 1;
    const b = 1;
    const expectedSumOfSquares = 1/(Math.sinh(a)*Math.sinh(a) + Math.sin(b)*Math.sin(b));
    const actualSumOfSquares = result.re*result.re + result.im*result.im;

    expect(actualSumOfSquares).toBeCloseTo(expectedSumOfSquares, 10);
  });
});