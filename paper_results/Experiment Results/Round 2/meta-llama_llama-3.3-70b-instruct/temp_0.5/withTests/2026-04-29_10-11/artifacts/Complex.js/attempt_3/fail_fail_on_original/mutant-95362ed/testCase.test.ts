import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    try {
      new Complex({ foo: "bar" });
    } catch (e) {
      expect(e).toBeInstanceOf(SyntaxError);
    }
  });
});