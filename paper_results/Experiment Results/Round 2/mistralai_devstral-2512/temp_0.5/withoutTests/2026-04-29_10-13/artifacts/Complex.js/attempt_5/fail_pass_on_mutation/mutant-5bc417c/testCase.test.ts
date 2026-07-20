import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should not return (0, π/2) for valid inputs", () => {
    const c = new Complex(3, 4);
    const result = c.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Math.PI / 2);
  });
});