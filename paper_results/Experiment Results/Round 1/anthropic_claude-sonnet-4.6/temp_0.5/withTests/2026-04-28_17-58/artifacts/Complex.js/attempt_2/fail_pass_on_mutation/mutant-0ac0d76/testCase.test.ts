import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log method", () => {
  it("should compute log of a negative real number with imaginary part pi", () => {
    // log(-1) = i*pi
    const result = new Complex(-1, 0).log();
    // Original: b===0 && a>0 is false for a=-1, so falls through to logHypot + atan2
    // Mutated: b===0 && a<=0 is true for a=-1, enters the if block
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});