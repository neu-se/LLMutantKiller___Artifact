import { Complex } from "./complex.js";

describe("Complex.asec", () => {
  it("should correctly compute asec for a complex number with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});