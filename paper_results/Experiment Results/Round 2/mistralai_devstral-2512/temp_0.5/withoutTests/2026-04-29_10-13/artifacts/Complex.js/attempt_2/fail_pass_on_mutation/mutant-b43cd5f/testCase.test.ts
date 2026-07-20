import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with newlines in the string representation", () => {
    const c = new Complex("3\n+4i");
    expect(c.re).toBeCloseTo(3, 10);
    expect(c.im).toBeCloseTo(4, 10);
  });
});