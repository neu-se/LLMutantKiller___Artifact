import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with negative imaginary unit", () => {
  it("should correctly parse a complex number string with negative imaginary unit like '1-i'", () => {
    const c = new Complex('1-i');
    expect(c.re).toBe(1);
    expect(c.im).toBe(-1);
  });
});