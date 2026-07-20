import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div", () => {
  it("dividing by zero should return Infinity", () => {
    // div checks if z['isZero']() to return INFINITY
    // If that check becomes 'if (false)', dividing by zero won't return INFINITY
    const c = new Complex(1, 2);
    const result = c.div(new Complex(0, 0));
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});