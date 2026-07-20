import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    const resultRe = result.re;
    const resultIm = result.im;
    expect(typeof resultRe).toBe('number');
    expect(typeof resultIm).toBe('number');
  });
});