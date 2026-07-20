import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    try {
      const complex = new Complex({ foo: "bar" });
    } catch (e) {
      expect(e).toBeInstanceOf(SyntaxError);
    }
    expect(() => new Complex({})).toThrowError();
  });
});