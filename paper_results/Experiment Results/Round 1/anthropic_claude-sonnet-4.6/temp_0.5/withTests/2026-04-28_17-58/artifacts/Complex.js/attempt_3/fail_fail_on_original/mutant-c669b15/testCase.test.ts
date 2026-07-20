import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide when divisor has equal magnitude real and imaginary parts", () => {
    // c = 1, d = -1, so |c| == |d| == 1
    // Original takes else branch, mutated takes if branch
    // With a = 1, b = 1: both give same result
    // But with overflow: c = 1e308, d = -1e308
    const result = new Complex(1, 1).div(new Complex(1e308, -1e308));
    // Expected: (1+i)/(1e308 - 1e308*i) = (1+i)*(1e308 + 1e308*i) / (2e616)
    // = (1e308 + 1e308*i + 1e308*i - 1e308) / 2e616
    // = 2e308*i / 2e616 = i/1e308 = 0 + 1e-308*i
    // Both branches should give the same result here
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1e-308, 320);
  });
});