import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number initialization", () => {
  it("should correctly handle single numeric parameter", () => {
    const c = new Complex(7);
    expect(c.re).toBe(7);
    expect(c.im).toBe(0);
  });
});