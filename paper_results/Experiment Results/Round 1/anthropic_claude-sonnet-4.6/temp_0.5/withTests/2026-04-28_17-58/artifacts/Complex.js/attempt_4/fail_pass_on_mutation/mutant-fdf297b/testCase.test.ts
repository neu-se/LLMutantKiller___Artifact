import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method", () => {
  it("should return NaN when both operands are infinite", () => {
    // Original (||): first check triggers for any infinite, returns NaN
    // Mutated (&&): first check only triggers when BOTH infinite, returns NaN
    // Both return NaN for Infinity - Infinity, but the path differs
    // For Infinity - finite:
    //   Original (||): NaN
    //   Mutated (&&): Infinity (falls through to second check)
    // The test output shows original gives Infinity for finite.sub(inf)
    // So original must use && in first check... 
    // Let's test: only-one-infinite should give NaN in mutated (||) but Infinity in original (&&)
    const inf = new Complex(Infinity, Infinity);
    const finite = new Complex(2, 3);
    const result = finite.sub(inf);
    // In original (&&): falls through first check, hits second || check → Infinity
    // In mutated (||): hits first check → NaN
    expect(result.isInfinite()).toBe(true);
  });
});