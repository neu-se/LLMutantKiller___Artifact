import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return correct value for non-zero input", () => {
    const result = new Complex(2, 0).acsc();
    expect(result.re).toBeCloseTo(0.5235987755982988, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});