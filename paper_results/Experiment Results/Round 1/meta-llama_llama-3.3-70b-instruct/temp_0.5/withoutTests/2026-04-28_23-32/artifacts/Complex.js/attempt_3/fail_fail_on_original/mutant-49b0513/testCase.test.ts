import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should calculate atanh correctly", () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});