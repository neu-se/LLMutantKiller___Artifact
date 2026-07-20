import { Complex } from "./complex.js";

describe("Complex.acsc", () => {
  it("should return correct result for non-zero complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.1528560718942273);
    expect(result.im).toBeCloseTo(-0.1019174345850493);
  });
});