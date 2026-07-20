import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return Infinity for real input with a !== 0 when d === 0", () => {
    const c = new Complex(1, 0);
    const result = c.acot();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});