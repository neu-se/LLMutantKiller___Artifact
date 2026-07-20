import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with scientific notation", () => {
    const c = new Complex("1e2+2e1i");
    expect(c.re).toBe(100);
    expect(c.im).toBe(20);
  });
});