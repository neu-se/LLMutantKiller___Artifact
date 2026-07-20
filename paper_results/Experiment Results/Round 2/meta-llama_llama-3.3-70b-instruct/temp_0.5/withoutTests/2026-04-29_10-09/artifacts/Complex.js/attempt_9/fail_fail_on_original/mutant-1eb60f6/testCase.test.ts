import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should throw no error when acsc is called with a and b as 0", () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).not.toThrow();
  });
});