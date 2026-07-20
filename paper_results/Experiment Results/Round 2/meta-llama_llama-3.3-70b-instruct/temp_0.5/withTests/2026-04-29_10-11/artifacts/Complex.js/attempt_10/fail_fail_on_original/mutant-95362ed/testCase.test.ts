import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    expect(() => {
      const complex = new Complex({ foo: "bar" });
    }).toThrowError(SyntaxError);
    expect(() => new Complex({})).toThrowError();
  });
});