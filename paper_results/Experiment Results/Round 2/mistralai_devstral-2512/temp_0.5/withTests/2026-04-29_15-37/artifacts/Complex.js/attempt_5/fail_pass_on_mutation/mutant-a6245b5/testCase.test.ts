import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should return correct imaginary part for non-zero b when a is -1", () => {
    const result = new Complex(-1, 1).atanh();
    expect(result.im).toBeCloseTo(1.0172219678978514, 10);
  });
});