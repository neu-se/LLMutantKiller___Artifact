import { Complex } from "./complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for non-zero complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.1521752325639557);
    expect(result.im).toBeCloseTo(-0.3398369094541219);
  });
});