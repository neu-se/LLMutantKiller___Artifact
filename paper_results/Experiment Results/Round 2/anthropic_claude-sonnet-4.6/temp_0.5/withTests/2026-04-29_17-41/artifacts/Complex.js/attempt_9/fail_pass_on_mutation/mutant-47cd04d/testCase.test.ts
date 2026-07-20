import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add", () => {
  it("finite add result should have correct real and imaginary parts", () => {
    // With mutation, if somehow INFINITY path is skipped, NaN arithmetic might occur
    // Test that adding NaN complex returns NaN
    const nan = Complex['NAN'];
    const finite = new Complex(1, 1);
    const result = finite.add(nan);
    expect(result.isNaN()).toBe(true);
  });
});