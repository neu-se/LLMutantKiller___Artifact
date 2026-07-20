import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle undefined input", () => {
    const result = new Complex(undefined);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});