import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle boundary case where real part equals 1 and imaginary part is 0", () => {
    const c = new Complex(1, 0);
    const result = c.atanh();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});