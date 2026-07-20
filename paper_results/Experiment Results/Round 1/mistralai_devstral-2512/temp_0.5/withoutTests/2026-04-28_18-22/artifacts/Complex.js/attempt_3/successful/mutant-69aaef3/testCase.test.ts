import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot when b is large and a is small", () => {
    const c = new Complex(1, 3000);
    const result = c.abs();
    expect(result).toBeCloseTo(3000.0001666666665, 10);
  });
});