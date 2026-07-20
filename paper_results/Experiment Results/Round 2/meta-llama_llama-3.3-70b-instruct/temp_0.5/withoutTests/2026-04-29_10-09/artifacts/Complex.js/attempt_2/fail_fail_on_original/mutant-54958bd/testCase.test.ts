import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly and handle the placeholder correctly", () => {
    const complex = new Complex(Math.PI / 2, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});