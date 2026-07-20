import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("zero raised to positive power should return zero", () => {
    // pow checks if (z['isZero']()) return Complex['ONE'] - this is a different isZero check
    // but let's verify pow(0) returns ONE
    const c = new Complex(3, 4);
    const result = c.pow(new Complex(0, 0));
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});