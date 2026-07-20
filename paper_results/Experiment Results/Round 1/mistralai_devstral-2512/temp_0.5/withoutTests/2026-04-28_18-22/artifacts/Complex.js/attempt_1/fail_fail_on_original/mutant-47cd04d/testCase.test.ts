import { Complex } from "./complex.js";

describe("Complex.add", () => {
  it("should return NaN when adding two infinite complex numbers", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.add(infinity);
    expect(result.isNaN()).toBe(true);
  });
});