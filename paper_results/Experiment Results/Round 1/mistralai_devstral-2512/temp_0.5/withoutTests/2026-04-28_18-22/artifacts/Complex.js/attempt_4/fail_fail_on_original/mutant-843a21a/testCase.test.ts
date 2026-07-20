import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the case where a is non-zero and b is non-zero", () => {
    const c = new Complex(1, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(-0.7853981633974483);
  });
});