import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle the case when b is 0", () => {
    const c = new Complex(0.5, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBeCloseTo(0);
  });
});