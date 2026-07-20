import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the case where a is non-zero and b is zero with d === 0", () => {
    const c = new Complex(1, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});