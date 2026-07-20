import { Complex } from "./complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const expected = Math.cos(x) - 1.0;
    const result = new Complex(x, 0).expm1().re - Math.cos(x) + 1.0;
    expect(result).toBeCloseTo(expected, 10);
  });
});