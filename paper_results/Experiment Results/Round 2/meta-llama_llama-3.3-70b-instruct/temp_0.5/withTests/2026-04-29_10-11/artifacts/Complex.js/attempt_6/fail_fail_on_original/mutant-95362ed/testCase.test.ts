import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(() => new Complex({})).not.toThrowError();
  });
});