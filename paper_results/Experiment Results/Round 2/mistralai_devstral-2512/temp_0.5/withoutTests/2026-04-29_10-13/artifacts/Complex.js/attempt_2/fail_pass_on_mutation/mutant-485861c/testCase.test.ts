import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse null input as zero", () => {
    const result = new Complex(null);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});