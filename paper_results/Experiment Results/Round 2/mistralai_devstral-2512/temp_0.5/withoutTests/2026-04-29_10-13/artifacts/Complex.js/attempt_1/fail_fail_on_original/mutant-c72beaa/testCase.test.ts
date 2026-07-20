import { Complex } from "./complex.js";

describe("Complex.acot", () => {
  it("should return correct result for real input with a !== 0", () => {
    const c = new Complex(2, 0);
    const result = c.acot();
    expect(result.re).toBeCloseTo(0.4576575543602858);
    expect(result.im).toBeCloseTo(0);
  });
});