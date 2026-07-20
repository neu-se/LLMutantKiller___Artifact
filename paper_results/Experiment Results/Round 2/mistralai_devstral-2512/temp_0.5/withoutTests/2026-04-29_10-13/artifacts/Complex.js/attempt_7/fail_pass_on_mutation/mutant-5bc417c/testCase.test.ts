import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should not return (0, π/2) for any input when d !== 0", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Math.PI / 2);
  });
});