import { Complex } from "./complex.js";

describe("cosm1 function behavior", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex("0.1+0i");
    const result = c.expm1();
    // The mutation changes the Taylor series calculation in cosm1
    // For small x, the result should be very close to (cos(x) - 1)
    // The mutation (xx * 20922789888000 instead of xx / 20922789888000) will cause a significant difference
    expect(result.re).toBeCloseTo(Math.cos(0.1) - 1, 10);
  });
});