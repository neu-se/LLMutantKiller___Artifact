import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should throw an error when calculating atanh with the mutated code", () => {
    const complex = new Complex(1.5, 0);
    expect(() => {
      const result = complex.atanh();
      expect(result.re).toBeNaN();
      expect(result.im).toBeNaN();
    }).toThrow();
  });
});