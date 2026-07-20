import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    try {
      const complex = new Complex({ foo: "bar" });
    } catch (e) {
      expect(e).toBeInstanceOf(SyntaxError);
    }
    const invalidComplex = new Complex({});
    expect(invalidComplex.re).toBeNaN();
    expect(invalidComplex.im).toBeNaN();
  });
});