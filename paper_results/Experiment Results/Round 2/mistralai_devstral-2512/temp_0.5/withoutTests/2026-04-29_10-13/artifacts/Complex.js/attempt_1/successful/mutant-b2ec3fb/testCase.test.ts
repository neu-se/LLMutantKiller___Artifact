import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.floor", () => {
  it("should correctly floor both real and imaginary parts", () => {
    const c = new Complex(3.7, -2.3);
    const result = c.floor(0);
    expect(result.re).toBe(3);
    expect(result.im).toBe(-3);
  });
});