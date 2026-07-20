import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle division by zero case correctly", () => {
    const c = new Complex(0, 0.5);
    const result = c.asech();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Math.PI / 2);
  });
});