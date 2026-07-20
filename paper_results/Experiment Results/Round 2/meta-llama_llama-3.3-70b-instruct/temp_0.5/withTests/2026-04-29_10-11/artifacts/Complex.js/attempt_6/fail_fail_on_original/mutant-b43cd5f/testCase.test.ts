import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing a complex number with a newline character in the string representation in the mutated code", () => {
    expect(() => new Complex('1+2i\n')).toThrowError();
  });
});