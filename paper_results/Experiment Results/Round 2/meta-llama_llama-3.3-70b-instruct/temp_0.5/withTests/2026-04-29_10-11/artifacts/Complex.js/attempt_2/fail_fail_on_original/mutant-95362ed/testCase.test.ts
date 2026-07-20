import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should parse an invalid complex number and return NaN", () => {
    const complex = new Complex({ foo: "bar" });
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
  });
});