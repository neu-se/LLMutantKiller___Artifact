import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should not return (0, π/2) for any input", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(!(result.re === 0 && result.im === Math.PI / 2)).toBe(true);
  });
});