import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly add imaginary parts when parsing string with multiple imaginary terms accumulated via +=", () => {
    // If im is undefined instead of 0, += would produce NaN
    const c = new Complex("1+2i");
    const result = c.add("3+4i");
    expect(result.re).toBe(4);
    expect(result.im).toBe(6);
  });
});