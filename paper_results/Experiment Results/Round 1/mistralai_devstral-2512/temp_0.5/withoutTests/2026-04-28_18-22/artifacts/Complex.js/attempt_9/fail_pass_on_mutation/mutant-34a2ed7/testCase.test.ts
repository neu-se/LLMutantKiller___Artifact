import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with operator stack", () => {
  it("should correctly handle operator stack with multiple operators before number", () => {
    const c = new Complex("++2");
    expect(c.re).toBeCloseTo(2, 10);
    expect(c.im).toBeCloseTo(0, 10);
  });
});