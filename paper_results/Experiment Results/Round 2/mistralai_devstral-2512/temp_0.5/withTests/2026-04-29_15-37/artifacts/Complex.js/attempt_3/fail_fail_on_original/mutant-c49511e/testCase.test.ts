// Test case to detect the mutation in the csc method
import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // This will cause b to be undefined, leading to incorrect calculations
    // We test with a known value to ensure the mutation breaks the behavior
    expect(result.re).toBeCloseTo(0.6215180171704285, 10);
    expect(result.im).toBeCloseTo(-0.3039251754547526, 10);
  });
});