import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a complex number string with real part", () => {
    const c = new Complex("3+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});