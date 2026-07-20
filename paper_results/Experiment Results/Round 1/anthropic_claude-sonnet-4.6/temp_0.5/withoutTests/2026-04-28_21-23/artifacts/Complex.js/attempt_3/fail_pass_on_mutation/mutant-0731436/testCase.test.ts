import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should return Infinity for asec(0, 0)", () => {
    // When a=0 and b=0, asec returns Complex(0, Infinity)
    // The mutation changes (b !== 0) ? -b/0 : 0 to (false) ? -b/0 : 0
    // This affects the d===0 branch where d = a*a + b*b
    // We need to find inputs where d===0 but b!==0
    // In JavaScript, Object.is(-0, 0) is false but -0 === 0 is true
    // So b = -0 won't help since -0 !== 0 is false
    // The mutation is in effectively dead code for real inputs
    // But let's verify the early return path for (0,0) is correct
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});