import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I after minus", () => {
  it("should parse '3-I' as 3 - 1i without throwing", () => {
    const c = new Complex("3-I");
    expect(c.re).toBe(3);
    expect(c.im).toBe(-1);
  });
});