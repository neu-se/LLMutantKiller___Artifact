import { Complex } from "../complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    try {
      const complex = new Complex({ foo: "bar" });
      expect(complex.re).toBeNaN();
      expect(complex.im).toBeNaN();
    } catch (e) {
      expect(e).toBeInstanceOf(SyntaxError);
    }
  });
});