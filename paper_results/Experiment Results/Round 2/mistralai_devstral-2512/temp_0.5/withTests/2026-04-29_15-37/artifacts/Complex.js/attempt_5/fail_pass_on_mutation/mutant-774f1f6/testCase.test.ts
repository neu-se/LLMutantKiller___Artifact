import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse numeric string without imaginary part", () => {
    const c = new Complex("42");
    expect(c.re).toBe(42);
    expect(c.im).toBe(0);
  });
});