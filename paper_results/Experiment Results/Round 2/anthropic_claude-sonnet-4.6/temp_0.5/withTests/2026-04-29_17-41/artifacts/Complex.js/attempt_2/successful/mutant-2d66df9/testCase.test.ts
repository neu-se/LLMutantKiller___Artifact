import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with mixed signs before imaginary unit", () => {
  it("should correctly parse '1+-i' as 1 - i", () => {
    const c = new Complex('1+-i');
    expect(c.re).toBe(1);
    expect(c.im).toBe(-1);
  });
});