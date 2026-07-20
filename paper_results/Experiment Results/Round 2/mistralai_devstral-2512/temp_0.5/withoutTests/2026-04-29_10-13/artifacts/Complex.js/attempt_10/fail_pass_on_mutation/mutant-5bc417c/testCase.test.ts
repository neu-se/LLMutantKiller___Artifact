import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should not always return (0, π/2) regardless of input", () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 4);
    const result1 = c1.acoth();
    const result2 = c2.acoth();
    expect(result1.re).not.toBe(0);
    expect(result1.im).not.toBe(Math.PI / 2);
    expect(result2.re).not.toBe(0);
    expect(result2.im).not.toBe(Math.PI / 2);
  });
});