import { Complex } from "./complex.js";

describe("Complex.atan", () => {
  it("should return (0, Infinity) when input is (0, 1)", () => {
    const result = new Complex(0, 1).atan();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});