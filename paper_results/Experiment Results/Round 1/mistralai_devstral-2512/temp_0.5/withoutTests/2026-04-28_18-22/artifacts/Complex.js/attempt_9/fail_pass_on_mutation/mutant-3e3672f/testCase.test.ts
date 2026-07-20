import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with uppercase 'I'", () => {
    const result = new Complex("5+3I");
    expect(result.re).toBe(5);
    expect(result.im).toBe(3);
  });
});