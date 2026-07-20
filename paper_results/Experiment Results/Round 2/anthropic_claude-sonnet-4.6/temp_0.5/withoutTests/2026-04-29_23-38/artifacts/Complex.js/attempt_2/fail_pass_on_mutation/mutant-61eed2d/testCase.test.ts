import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a purely imaginary number string", () => {
    const c = new Complex("2i");
    expect(c.im).toBe(2);
    expect(c.re).toBe(0);
  });
});