import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle the case when a = -1 by producing Infinity in real component", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});