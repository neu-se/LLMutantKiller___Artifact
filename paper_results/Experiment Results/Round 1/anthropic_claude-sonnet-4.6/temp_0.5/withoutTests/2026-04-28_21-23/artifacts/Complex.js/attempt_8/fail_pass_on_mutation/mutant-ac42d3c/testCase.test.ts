import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should correctly compute acot for Complex(0, 1) which internally calls atan with Complex(0, -1)", () => {
    // acot(0+i) = atan(1/(0+i)) = atan(conj/|z|^2) where z=i
    // d = 0 + 1 = 1, so calls atan(Complex(0, -1))
    // Original: atan(0,-1) = Complex(0, -Infinity), then acot returns that
    // The result should be Complex(0, -Infinity) -> isInfinite() = true
    const c = new Complex(0, 1);
    const result = c.acot();
    expect(result.isInfinite()).toBe(true);
  });
});