import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly handle default parameter when no argument is passed", () => {
    const c = new Complex(1.123, -2.456);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(-2);
  });
});