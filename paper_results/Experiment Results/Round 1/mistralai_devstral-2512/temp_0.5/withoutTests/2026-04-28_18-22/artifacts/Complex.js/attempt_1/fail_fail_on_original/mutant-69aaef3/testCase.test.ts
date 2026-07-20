import { Complex } from "./complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot for large values", () => {
    const c = new Complex(3000, 3000);
    const result = c.abs();
    expect(result).toBeCloseTo(4242.640687119285, 10);
  });
});