import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute asech for a complex number where b equals 2", () => {
    const c = new Complex(0.5, 2);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.2554128115132005);
    expect(result.im).toBeCloseTo(-1.360844425377922);
  });
});