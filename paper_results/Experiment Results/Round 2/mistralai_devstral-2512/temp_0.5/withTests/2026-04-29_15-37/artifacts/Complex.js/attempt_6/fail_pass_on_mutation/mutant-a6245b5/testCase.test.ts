import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should handle division by zero correctly when b is zero", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.im).toBe(0);
  });
});