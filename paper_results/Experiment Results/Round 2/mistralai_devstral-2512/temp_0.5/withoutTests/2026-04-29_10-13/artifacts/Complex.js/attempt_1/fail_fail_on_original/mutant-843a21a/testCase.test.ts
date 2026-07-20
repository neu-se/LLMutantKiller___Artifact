import { Complex } from "./complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the case where a is non-zero and b is zero", () => {
    const c = new Complex(2, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});