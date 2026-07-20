import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return Infinity for asech(0)", () => {
    const result = new Complex(0, 0).asech();
    expect(result.isInfinite()).toBe(true);
  });
});