import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should handle empty string input without throwing", () => {
    const result = new Complex("");
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});