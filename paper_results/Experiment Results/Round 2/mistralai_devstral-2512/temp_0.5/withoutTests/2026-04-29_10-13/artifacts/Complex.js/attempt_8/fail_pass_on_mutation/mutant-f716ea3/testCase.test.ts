import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle the special case where a = -1 correctly", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});