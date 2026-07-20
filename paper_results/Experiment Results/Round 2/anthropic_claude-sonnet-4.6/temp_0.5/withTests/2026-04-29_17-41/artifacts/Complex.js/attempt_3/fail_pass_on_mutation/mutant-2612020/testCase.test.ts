import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string '0+0i' correctly with re=0 and im=0", () => {
    const c = new Complex("0+0i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.equals(0)).toBe(true);
  });
});