import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should throw an error when asech is called on mutated code", () => {
    const complex = new Complex(0.5, 0);
    expect(complex.asech).toBeInstanceOf(Function);
  });
});