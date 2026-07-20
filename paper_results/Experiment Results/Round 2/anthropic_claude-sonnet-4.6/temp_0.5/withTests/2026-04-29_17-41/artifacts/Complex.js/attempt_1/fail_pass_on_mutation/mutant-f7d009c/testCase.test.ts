import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot precision with b === 3000", () => {
  it("should compute abs correctly when imaginary part is exactly 3000", () => {
    const c = new Complex(2999, 3000);
    const result = c.abs();
    // Expected: sqrt(2999^2 + 3000^2) = sqrt(8994001 + 9000000) = sqrt(17994001)
    const expected = Math.sqrt(2999 * 2999 + 3000 * 3000);
    expect(result).toBeCloseTo(expected, 10);
  });
});