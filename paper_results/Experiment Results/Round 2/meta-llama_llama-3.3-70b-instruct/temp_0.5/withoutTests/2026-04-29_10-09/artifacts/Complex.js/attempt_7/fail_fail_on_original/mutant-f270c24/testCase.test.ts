import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate acsch correctly when b is 0", () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});