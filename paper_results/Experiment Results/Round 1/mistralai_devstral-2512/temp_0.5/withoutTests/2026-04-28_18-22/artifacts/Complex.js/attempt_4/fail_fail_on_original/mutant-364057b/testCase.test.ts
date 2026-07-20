import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle division by zero case correctly when a=0", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});