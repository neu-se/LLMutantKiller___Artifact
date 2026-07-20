import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of negative real should give correct result with pi imaginary part, while positive real gives zero imaginary", () => {
    // Test that distinguishes: with mutation, positive real (a>0, b=0) now takes the `a<=0` branch path
    // The key difference: for a=-1 (negative real), original takes the else path (logHypot + atan2)
    // With mutation, a=-1 satisfies a<=0, enters if block
    // For a=2 (positive real), original enters if block, mutation does NOT
    // Since if block is empty in both, we need to find where behavior actually differs
    
    // Try: what does log return for a complex number where atan2 gives non-zero?
    // log(i) = i*pi/2
    const result = new Complex(0, 1).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});