import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a purely imaginary number expressed with uppercase I", () => {
    const c = new Complex("I");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});