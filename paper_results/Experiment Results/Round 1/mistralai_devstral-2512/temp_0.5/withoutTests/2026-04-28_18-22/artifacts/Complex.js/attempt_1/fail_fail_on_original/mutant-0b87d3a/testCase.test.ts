import { Complex } from "./complex.js";

describe("Complex.acsc", () => {
  it("should return correct result for non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.6614, 3);
    expect(result.im).toBeCloseTo(-0.4812, 3);
  });
});