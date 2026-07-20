import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil with default precision (places=0)", () => {
    const c = new Complex(1.1, -2.9);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(-2);
  });
});