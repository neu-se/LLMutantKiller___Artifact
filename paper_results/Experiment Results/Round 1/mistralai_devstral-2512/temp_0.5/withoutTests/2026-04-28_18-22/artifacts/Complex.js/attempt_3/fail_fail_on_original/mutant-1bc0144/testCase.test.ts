import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for a simple real number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(Math.log((1 + Math.sqrt(1 - 0.25)) / 0.5), 10);
    expect(result.im).toBe(0);
  });
});