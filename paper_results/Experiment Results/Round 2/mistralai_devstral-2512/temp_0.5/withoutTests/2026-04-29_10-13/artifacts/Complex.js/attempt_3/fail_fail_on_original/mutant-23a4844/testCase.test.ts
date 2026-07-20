import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle the special case when a = -1", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});