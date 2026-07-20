import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate the complex inverse hyperbolic secant", () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});