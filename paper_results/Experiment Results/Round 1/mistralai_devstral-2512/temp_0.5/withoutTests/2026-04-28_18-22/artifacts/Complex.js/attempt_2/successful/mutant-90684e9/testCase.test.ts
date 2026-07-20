import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex clone method", () => {
  it("should return a new Complex instance with the same real and imaginary parts", () => {
    const original = new Complex(3, 4);
    const cloned = original.clone();
    expect(cloned).toBeInstanceOf(Complex);
    expect(cloned.re).toBe(3);
    expect(cloned.im).toBe(4);
  });
});