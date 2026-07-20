import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number initialization", () => {
  it("should correctly initialize real and imaginary parts from string", () => {
    const c = new Complex("5+3i");
    expect(c.re).toBe(5);
    expect(c.im).toBe(3);
  });
});