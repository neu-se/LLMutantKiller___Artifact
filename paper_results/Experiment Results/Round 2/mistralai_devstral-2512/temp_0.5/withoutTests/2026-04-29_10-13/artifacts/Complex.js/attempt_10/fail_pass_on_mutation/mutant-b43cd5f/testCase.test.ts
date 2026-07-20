import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with newline characters in the input string", () => {
    const result = new Complex("2\n+3i");
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});