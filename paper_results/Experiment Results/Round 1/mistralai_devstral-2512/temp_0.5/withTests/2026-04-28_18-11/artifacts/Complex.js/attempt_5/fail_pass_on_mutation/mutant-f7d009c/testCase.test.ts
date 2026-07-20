import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should use precise calculation when b equals exactly 3000", () => {
    // Create a complex number where a < 3000 and b = 3000
    const c = new Complex(1000, 3000);
    const absValue = c.abs();

    // The original code should use precise calculation when b >= 3000
    // The mutated code would use simple sqrt when b <= 3000
    // We need to verify the precise calculation path is taken
    // by checking against a value that would be different with simple sqrt
    const expected = 3000 * Math.sqrt(1 + (1000/3000) * (1000/3000));
    expect(absValue).toBeCloseTo(expected, 12);
  });
});