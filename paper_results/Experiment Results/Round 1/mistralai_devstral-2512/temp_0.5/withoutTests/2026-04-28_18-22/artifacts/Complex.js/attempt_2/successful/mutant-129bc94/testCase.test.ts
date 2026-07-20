import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js mutation test", () => {
  it("should correctly export Complex constructor", () => {
    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});