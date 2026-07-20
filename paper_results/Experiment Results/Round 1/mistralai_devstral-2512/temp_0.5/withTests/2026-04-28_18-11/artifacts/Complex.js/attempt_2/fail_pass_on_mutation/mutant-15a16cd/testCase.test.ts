import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil complex numbers with default precision", () => {
    const c = new Complex(1.234, -2.345);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(-2);
  });
});