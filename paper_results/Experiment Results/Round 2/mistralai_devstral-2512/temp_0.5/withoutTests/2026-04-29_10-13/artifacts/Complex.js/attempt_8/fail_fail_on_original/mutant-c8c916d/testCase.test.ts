import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle the case when a is zero and b is non-zero", () => {
    const result = new Complex(0, 1).acsc();
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(-0.881373587019543);
  });
});