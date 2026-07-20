import { Complex } from "./complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the case when a is 0 and b is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});