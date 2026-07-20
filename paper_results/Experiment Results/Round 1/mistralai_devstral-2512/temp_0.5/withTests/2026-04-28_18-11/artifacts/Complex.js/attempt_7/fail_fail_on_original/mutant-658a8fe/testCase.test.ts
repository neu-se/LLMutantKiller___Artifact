import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // This test specifically checks the behavior when d !== 0
    // The mutation would cause it to take the wrong branch
    expect(result.re).toBeCloseTo(0.3217505543966422, 10);
    expect(result.im).toBeCloseTo(-0.40235947810852506, 10);
  });
});