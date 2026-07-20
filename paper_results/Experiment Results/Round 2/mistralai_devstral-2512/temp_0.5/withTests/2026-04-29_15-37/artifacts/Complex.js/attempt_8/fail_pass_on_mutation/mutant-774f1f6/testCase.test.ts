import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number initialization", () => {
  it("should correctly initialize with two numeric parameters", () => {
    const c = new Complex(2, 3);
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
  });
});