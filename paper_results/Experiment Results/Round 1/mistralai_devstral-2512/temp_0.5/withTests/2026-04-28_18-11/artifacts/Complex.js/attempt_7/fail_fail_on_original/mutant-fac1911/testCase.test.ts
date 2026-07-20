import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle the division operation in acsc calculation", () => {
    const c = new Complex(3, 4);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.144, 3);
    expect(result.im).toBeCloseTo(-0.201, 3);
  });
});