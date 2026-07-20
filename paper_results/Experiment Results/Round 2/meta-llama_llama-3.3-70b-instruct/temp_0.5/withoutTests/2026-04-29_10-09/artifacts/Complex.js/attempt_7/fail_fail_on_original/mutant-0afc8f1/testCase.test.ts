import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should have asech function defined", () => {
    const complex = new Complex(0, 0);
    expect(complex.asech).toBeInstanceOf(Function);
    expect(complex.asech.toString().length).toBeGreaterThan(0);
  });
});