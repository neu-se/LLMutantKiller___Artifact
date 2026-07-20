import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number toString", () => {
  it("should correctly format zero imaginary part when real part is non-zero", () => {
    const c = new Complex(5, 0);
    expect(c.toString()).toBe("5");
  });
});