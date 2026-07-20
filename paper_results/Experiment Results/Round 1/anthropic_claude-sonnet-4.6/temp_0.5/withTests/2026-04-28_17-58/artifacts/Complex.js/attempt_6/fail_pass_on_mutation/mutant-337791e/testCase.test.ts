import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp", () => {
  it("exp chained with log should return original number", () => {
    // exp(log(z)) = z for z with positive real part
    // If exp is broken for real numbers, this chain will fail
    const z = new Complex(3, 0);
    const result = z.log().exp();
    expect(result.re).toBeCloseTo(3, 10);
    expect(result.im).toBeCloseTo(0, 10);
    // Critically test valueOf which returns null if im !== 0
    expect(result.valueOf()).toBeCloseTo(3, 10);
  });
});