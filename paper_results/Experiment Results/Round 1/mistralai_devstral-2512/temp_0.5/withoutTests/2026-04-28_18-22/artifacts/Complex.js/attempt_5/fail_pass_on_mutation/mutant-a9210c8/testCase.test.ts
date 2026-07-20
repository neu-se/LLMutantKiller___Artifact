import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should produce different results when imaginary part is accessed incorrectly", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // This test will pass on original code but fail on mutated code
    // because the mutated code accesses this[""] instead of this['im']
    expect(result.im).not.toBe(0);
  });
});