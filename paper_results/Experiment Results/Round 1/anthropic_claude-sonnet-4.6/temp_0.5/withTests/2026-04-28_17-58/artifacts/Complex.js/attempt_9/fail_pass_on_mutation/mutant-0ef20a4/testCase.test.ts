import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of 2 should return 0.5", () => {
    const c = new Complex(2, 1);
    const inv = c.inverse();
    // 1/(2+i) = (2-i)/5 = 0.4 - 0.2i
    expect(inv.re).toBeCloseTo(0.4);
    expect(inv.im).toBeCloseTo(-0.2);
  });
});