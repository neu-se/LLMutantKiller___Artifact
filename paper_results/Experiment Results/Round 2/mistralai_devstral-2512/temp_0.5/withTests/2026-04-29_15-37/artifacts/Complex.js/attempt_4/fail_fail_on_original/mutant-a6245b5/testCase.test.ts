import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should handle division by zero correctly when b is non-zero", () => {
    const result = new Complex(-1, 1).atanh();
    expect(result.im).toBe(Infinity);
  });
});