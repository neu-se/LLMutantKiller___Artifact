import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with leading plus operator followed by number", () => {
    const c = new Complex("+3.5");
    expect(c.re).toBe(3.5);
    expect(c.im).toBe(0);
  });
});