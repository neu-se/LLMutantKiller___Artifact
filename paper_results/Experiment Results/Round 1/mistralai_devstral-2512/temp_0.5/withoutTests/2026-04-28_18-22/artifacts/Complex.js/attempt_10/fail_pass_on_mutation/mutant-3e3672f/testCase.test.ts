import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with uppercase 'I' as imaginary unit", () => {
    const result = new Complex("1+2I");
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);
  });
});