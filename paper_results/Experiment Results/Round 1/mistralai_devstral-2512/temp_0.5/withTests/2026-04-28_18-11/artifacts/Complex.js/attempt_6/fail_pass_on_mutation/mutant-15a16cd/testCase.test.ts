import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly handle default parameter value in ceil method", () => {
    const c = new Complex(1.123, -2.456);
    const result = c.ceil();
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(-2);
  });
});