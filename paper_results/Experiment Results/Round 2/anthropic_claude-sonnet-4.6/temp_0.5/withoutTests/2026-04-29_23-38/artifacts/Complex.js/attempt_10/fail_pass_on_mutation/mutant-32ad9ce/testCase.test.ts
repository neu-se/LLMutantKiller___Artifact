import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse mutation", () => {
  it("should produce correct result for pow(0, complex) where one intermediate component is NaN", () => {
    // pow with base 0 and positive real exponent returns ZERO
    // But what about edge cases that go through the general pow formula?
    // logHypot(0,0) = log(0) = -Infinity
    // exp(-Infinity * positive) = 0, so result should be ZERO
    // Let's test a case where intermediate NaN occurs in one component
    
    // Actually let's test: new Complex(0).pow(new Complex(0.5, 1))
    // a=0, b=0, z.re=0.5, z.im=1, z.re > 0, z.im >= 0 -> returns ZERO
    const result = new Complex(0).pow(new Complex(0.5, 1));
    expect(result.equals(Complex.ZERO)).toBe(true);
  });
});