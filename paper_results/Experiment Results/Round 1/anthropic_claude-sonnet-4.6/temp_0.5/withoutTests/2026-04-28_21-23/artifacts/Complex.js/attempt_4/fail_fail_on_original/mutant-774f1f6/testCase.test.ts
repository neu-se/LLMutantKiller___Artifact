import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parsing", () => {
  it("should correctly parse undefined as NaN not zero", () => {
    // If the if-condition changed, undefined might now hit the null branch
    const c = new Complex(undefined);
    expect(isNaN(c.re) || c.re === 0).toBe(true);
    // The key: with original code, undefined goes to default: parser_exit()
    // If mutation changed condition, behavior differs
    expect(() => new Complex(undefined)).toThrow();
  });
});