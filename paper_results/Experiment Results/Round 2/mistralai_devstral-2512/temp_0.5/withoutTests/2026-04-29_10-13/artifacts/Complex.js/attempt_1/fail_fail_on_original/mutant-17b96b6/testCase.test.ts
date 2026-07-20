import { Complex } from "./complex.js";

describe("Complex.acoth()", () => {
  it("should return the correct value for non-zero input", () => {
    const c = new Complex(2, 0);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});