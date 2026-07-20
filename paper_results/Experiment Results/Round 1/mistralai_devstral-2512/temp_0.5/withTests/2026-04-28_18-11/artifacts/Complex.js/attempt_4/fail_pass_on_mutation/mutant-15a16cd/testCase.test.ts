import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly handle default parameter when places is not provided", () => {
    const c = new Complex(1.5, -2.5);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(-2);
  });
});