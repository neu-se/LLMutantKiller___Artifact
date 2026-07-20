import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle division by zero correctly when computing atanh", () => {
    const c = new Complex(0, 1);
    const result = c.atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});