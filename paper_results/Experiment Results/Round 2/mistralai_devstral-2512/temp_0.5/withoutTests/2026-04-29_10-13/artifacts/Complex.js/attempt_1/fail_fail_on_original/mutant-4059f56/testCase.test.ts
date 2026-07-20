import { Complex } from "./complex.js";

describe("Complex.clone", () => {
  it("should create a copy of the complex number", () => {
    const original = new Complex(3, 4);
    const cloned = original.clone();
    expect(cloned.re).toBe(3);
    expect(cloned.im).toBe(4);
    expect(cloned).not.toBe(original);
  });
});