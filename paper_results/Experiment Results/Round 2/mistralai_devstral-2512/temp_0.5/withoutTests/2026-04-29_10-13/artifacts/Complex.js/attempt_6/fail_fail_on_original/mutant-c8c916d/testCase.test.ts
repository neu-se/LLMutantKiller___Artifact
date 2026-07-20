import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle the case when both a and b are non-zero", () => {
    const result = new Complex(1, 1).acsc();
    expect(result.re).toBeCloseTo(0.413649042595728);
    expect(result.im).toBeCloseTo(-0.5596157879354227);
  });
});