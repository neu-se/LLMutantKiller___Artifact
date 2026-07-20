import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with purely imaginary base", () => {
  it("should return exact result for purely imaginary base raised to integer power (case 3: i^3 = -i)", () => {
    // (0 + 2i)^3 should be exactly (0, -8)
    // Special branch: (3 % 4 + 4) % 4 === 3 → new Complex(0, -Math.pow(2, 3)) = (0, -8)
    // Mutated code falls to general formula which may give floating point errors
    // More importantly, test (0 + i)^3 where imaginary part should be exactly -1
    const result = new Complex(0, 1).pow(new Complex(3, 0));
    // With original code: case 3 → new Complex(0, -Math.pow(1, 3)) = (0, -1)
    // With mutated code: general formula path since a===0 branch is skipped
    // Check that im is exactly -1 (original) vs floating point (mutated)
    expect(result.re).toBe(0);
    expect(result.im).toBe(-1);
  });
});