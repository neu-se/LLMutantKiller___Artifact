import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should correctly handle the boundary case where a = 3000 and b = 0", () => {
    const c = new Complex(3000, 0);
    const result = c.log();
    // For b=0, the code should take a special path regardless of the mutation
    // This verifies the mutation doesn't affect the special case handling
    expect(result.re).toBeCloseTo(Math.log(3000), 12);
    expect(result.im).toBe(0);
  });
});