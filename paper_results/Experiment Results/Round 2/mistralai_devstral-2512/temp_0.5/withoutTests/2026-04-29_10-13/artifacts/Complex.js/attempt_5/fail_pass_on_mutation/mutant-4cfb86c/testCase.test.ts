import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should handle division by zero correctly for (0, 1)", () => {
    const result = new Complex(0, 1).acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});