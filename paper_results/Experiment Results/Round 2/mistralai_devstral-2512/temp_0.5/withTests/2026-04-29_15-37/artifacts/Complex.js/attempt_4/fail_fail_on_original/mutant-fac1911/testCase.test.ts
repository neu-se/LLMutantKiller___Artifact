import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle division in acsc calculation for complex numbers", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1.4436354751788103, 10);
  });
});