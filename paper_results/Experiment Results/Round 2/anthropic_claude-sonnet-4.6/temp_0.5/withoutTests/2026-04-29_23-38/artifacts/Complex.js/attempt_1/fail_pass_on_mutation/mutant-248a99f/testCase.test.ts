import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division - zero divided by finite number", () => {
  it("should return ZERO when dividing zero by a finite non-zero complex number", () => {
    const zero = new Complex(0, 0);
    const divisor = new Complex(3, 4);
    const result = zero.div(divisor);
    
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(true);
  });
});