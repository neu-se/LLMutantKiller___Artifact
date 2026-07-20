import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should return correct result for acot(0) where d=0 branch is taken", () => {
    // When a=0 and b=0, d = a*a + b*b = 0, so the else branch is taken
    // Original: (b !== 0) ? -b / 0 : 0 => since b=0, result is 0
    // Mutated:  (false) ? -b / 0 : 0   => result is 0
    // Both give same result here, so let's test a non-zero imaginary to detect mutation
    // Actually test acot with purely imaginary number where b != 0 but d could be 0
    // For a=0, b=1: d = 0 + 1 = 1 != 0, so first branch taken
    // The mutation only differs when d=0 AND b!=0, which is impossible
    // Let's verify acot(0+0i) returns the correct value
    const result = new Complex(0, 0).acot();
    // acot(0) = atan(1/0) = pi/2
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});