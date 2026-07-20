import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log with large real part", () => {
  it("returns finite result when real part causes overflow in naive computation but imaginary is small", () => {
    // a = 1e160: a*a = 1e320 which overflows to Infinity
    // Original: _a >= 3000, so goes to overflow-safe path (halves a,b then adds LN2)
    // Mutated: true && _b < 3000, so takes fast path: Math.log(1e160*1e160 + 1)*0.5 = Infinity
    const c = new Complex(1e160, 1);
    const result = c.log();
    expect(isFinite(result.re)).toBe(true);
  });
});