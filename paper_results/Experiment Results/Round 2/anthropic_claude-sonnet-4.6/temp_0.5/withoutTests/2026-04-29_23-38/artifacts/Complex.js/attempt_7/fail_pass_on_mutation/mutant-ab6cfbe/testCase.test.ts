import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log(0+0i) should return Complex with re=-Infinity and im=0", () => {
    const z = new Complex(0, 0);
    const logZ = z.log();
    // Both original and mutated should give same result since if block is empty
    // But let's check if there's any difference in behavior
    expect(logZ.re).toBe(-Infinity);
    expect(logZ.im).toBe(0);
    expect(logZ.isNaN()).toBe(false);
  });
});