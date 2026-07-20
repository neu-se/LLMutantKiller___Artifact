import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number from object with re and im properties", () => {
    const c = new Complex({ re: 5, im: -2 });
    expect(c.re).toBe(5);
    expect(c.im).toBe(-2);
  });
});