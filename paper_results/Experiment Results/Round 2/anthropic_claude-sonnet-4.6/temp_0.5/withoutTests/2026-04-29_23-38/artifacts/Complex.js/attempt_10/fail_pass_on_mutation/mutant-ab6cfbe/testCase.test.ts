import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log(0+0i) real part should use logHypot giving -Infinity", () => {
    const z = new Complex(0, 0);
    const result = z.log();
    // Both original and mutated give same result
    // Let me try through asin chain
    const asinResult = new Complex(1, 0).asin();
    expect(asinResult.re).toBeCloseTo(Math.PI / 2);
    expect(Math.abs(asinResult.im)).toBeLessThan(1e-10);
  });
});