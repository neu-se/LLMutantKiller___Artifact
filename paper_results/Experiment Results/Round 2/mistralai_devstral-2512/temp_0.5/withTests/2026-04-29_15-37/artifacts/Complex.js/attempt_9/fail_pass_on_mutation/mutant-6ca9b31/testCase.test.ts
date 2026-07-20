import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly handle negative zero imaginary part in string representation", () => {
    const c = new Complex(5, -0);
    expect(c.toString()).toBe("5");
  });
});