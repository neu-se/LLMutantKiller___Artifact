import { Complex } from "./complex.js";

describe("Complex equals method", () => {
  it("should return true when comparing numbers that are exactly EPSILON apart", () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1 + Complex.EPSILON, 0);
    expect(c1.equals(c2)).toBe(true);
  });
});