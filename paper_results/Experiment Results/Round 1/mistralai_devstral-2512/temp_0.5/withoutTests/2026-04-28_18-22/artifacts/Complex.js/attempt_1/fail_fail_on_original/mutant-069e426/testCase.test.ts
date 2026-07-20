import { Complex } from "./complex.js";

describe("Complex.asec()", () => {
  it("should return the correct arcsecant for a purely imaginary number with a=0", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});