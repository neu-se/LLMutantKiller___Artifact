import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should produce correct real component for values greater than 1", () => {
    const result = new Complex(1.5, 0).atanh();
    expect(result.re).toBeCloseTo(0.8047189562170501, 10);
  });
});