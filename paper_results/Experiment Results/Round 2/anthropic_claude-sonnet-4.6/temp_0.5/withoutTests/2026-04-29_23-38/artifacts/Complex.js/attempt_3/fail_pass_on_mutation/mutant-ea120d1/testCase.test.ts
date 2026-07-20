import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition", () => {
  it("uses safe path when |b| === 3000 and |a| is very small", () => {
    // For a=1e-10, b=3000: a*a underflows to 0 in float64
    // Fast path: Math.log(0 + 9000000) * 0.5 = Math.log(9000000) * 0.5
    // Safe path: 0.5 * Math.log(0 + 2250000) + Math.LN2 = 0.5 * Math.log(2250000) + Math.LN2
    const a = 1e-10, b = 3000;
    const safeResult = 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2;
    expect(new Complex(a, b).log().re).toBe(safeResult);
  });
});