import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number initialization", () => {
  it("should correctly initialize with undefined parameters", () => {
    const c = new Complex(undefined, undefined);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});