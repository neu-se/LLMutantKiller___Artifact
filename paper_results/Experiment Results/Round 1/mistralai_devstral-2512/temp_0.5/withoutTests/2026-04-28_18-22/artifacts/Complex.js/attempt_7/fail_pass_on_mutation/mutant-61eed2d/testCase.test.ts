import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with decimal imaginary part", () => {
    const c = new Complex("2.5+3.7i");
    expect(c.re).toBe(2.5);
    expect(c.im).toBe(3.7);
  });
});