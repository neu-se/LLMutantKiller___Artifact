import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should detect the division mutation in acsc calculation", () => {
    const c = new Complex(2, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});