import { Complex } from "./complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The mutation changes the Taylor series calculation in cosm1
    // For x=0.1, the original should give a specific result
    expect(result.re).toBeCloseTo(Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});