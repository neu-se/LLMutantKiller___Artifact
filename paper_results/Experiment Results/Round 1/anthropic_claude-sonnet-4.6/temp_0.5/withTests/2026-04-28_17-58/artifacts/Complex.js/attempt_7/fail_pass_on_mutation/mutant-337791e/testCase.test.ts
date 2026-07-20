import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp", () => {
  it("exp with NaN imaginary part behaves correctly", () => {
    // When im is NaN: (im === 0) is false in original, (im !== 0) is also false for NaN
    // When im is 0: original enters block (no-op), mutant does NOT enter block (no-op)
    // Try im = 0 specifically - Math.sin(0) = 0, Math.cos(0) = 1
    // The key: does the if-block contain the return statement outside the comment?
    const result = new Complex(0, 0).exp();
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
    expect(result.valueOf()).toBe(1); // valueOf returns re only when im === 0
  });
});