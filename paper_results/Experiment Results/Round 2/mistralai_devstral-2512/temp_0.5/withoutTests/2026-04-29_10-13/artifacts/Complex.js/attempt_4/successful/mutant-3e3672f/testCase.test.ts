import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with uppercase 'I' when it appears alone", () => {
    const result = new Complex("I");
    expect(result.re).toBe(0);
    expect(result.im).toBe(1);
  });
});