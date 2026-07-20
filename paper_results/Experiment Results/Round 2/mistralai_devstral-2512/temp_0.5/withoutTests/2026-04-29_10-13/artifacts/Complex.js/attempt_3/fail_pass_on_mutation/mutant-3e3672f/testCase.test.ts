import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with uppercase 'I' in the imaginary part", () => {
    const result = new Complex("5I");
    expect(result.re).toBe(0);
    expect(result.im).toBe(5);
  });
});