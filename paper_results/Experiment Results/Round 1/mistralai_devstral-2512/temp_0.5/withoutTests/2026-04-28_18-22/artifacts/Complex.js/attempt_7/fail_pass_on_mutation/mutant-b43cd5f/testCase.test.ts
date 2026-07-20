import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with newlines in the string", () => {
    const result = new Complex("1\n+2i");
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);
  });
});