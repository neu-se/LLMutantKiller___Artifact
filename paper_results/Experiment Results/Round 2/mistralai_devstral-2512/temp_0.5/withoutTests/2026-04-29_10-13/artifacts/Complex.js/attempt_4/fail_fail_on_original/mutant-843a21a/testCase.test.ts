import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should return Infinity when real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(-Infinity);
  });
});