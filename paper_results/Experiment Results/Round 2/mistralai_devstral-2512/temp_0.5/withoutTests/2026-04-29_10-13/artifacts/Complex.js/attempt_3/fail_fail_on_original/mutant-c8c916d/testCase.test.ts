import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle the case when a is non-zero and b is zero", () => {
    const result = new Complex(2, 0).acsc();
    expect(result.re).toBeCloseTo(0.5235987755982988);
    expect(result.im).toBe(0);
  });
});