import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle real numbers greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});