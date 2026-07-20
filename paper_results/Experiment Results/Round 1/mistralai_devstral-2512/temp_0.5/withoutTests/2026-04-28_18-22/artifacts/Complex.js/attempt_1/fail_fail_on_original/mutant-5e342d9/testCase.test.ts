import { Complex } from "./complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot for large values", () => {
    const c = new Complex(3000, 4000);
    const abs = c.abs();
    expect(abs).toBeCloseTo(5000);
  });
});