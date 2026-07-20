import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number from string with only imaginary part", () => {
    const c = new Complex("5i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(5);
  });
});