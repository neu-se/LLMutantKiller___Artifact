import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log direct behavior", () => {
  it("log of zero should produce correct result", () => {
    // log(0) - both versions use general formula
    // logHypot(0,0) = log(0) = -Infinity, atan2(0,0) = 0
    const c = new Complex(0, 0);
    const result = c.log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});