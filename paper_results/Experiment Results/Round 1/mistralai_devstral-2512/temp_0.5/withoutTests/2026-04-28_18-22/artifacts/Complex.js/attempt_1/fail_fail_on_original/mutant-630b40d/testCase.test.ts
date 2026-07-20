import { Complex } from "./complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute the hypotenuse for large values", () => {
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 10);
  });
});