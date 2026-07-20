import { Complex } from "./complex.js";

describe("Complex.js hypot function", () => {
  it("should correctly compute hypot for large values", () => {
    const c = new Complex(4000, 2000);
    const abs = c.abs();
    expect(abs).toBeCloseTo(4472.135955, 5);
  });
});