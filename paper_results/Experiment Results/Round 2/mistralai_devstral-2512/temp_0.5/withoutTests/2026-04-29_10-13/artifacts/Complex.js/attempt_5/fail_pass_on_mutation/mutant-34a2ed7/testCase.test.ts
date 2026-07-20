import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with multiple operators", () => {
    const c = new Complex("++5+3i");
    expect(c.re).toBe(5);
    expect(c.im).toBe(3);
  });
});