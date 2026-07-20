import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return positive zero for real part when atan is called on Complex(0, -1)", () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // Original returns new Complex(0, -Infinity) where re is explicitly +0
    // Mutated falls through and computes -0.5 * t1['im'] where t1['im'] = 0
    // -0.5 * 0 = -0 (negative zero)
    expect(result.im).toBe(-Infinity);
    // Use Object.is to distinguish +0 from -0
    expect(1 / result.re).toBe(Infinity); // +0 gives +Infinity, -0 gives -Infinity
  });
});