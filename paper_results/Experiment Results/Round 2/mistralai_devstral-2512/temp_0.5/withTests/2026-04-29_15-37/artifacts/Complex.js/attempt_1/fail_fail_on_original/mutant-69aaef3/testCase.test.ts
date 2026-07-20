import { Complex } from "./complex.js";

describe("hypot function mutation", () => {
  it("should correctly compute hypot for large values", () => {
    const c = new Complex(3000, 3000);
    const abs = c.abs();
    expect(abs).toBeCloseTo(4242.640687119285, 10);
  });
});