import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a string with re=0 explicitly stated", () => {
    const c = new Complex("0+1i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    expect(c.toString()).toBe("i");
  });
});