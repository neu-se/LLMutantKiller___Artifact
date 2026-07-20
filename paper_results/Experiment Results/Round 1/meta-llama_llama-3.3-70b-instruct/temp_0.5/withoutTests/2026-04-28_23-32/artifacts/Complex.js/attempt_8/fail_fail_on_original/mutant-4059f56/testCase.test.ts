import { Complex } from "../complex.js";

describe("Complex", () => {
  it("should clone the complex number correctly", () => {
    const complex = new Complex(1, 2);
    const cloned = complex.clone();
    expect(cloned.re).toBe(1);
    expect(cloned.im).toBe(2);
    expect(() => {
      const temp = cloned[""];
    }).not.toThrow();
  });
});