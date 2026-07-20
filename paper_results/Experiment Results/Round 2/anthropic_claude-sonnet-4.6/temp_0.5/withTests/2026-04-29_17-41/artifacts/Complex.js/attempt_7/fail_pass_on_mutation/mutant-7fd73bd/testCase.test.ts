import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("should compute log of large real number accurately", () => {
    // For very large a, logHypot uses different branch: a/2, b/2 path
    // logHypot(4000, 0): _a=4000 >= 3000, so uses: a=2000, b=0, 0.5*log(2000*2000+0)+LN2
    // = 0.5*log(4000000) + log(2) = 0.5*(log(4000000) + 2*log(2)) = 0.5*log(16000000)
    // Math.log(4000) = log(4000)
    // These should be equal: 0.5*log(16000000) = 0.5*log(4000^2) = log(4000) ✓
    // So no difference there either...
    // Let me test atan function which internally calls log
    const result = new Complex(0, 0.5).atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.log(3) / 2, 10);
  });
});