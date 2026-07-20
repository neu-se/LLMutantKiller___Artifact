import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle non-zero real component correctly", () => {
    const result = new Complex(1, 0).acsc();
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});