import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle empty string parsing", () => {
    const c = new Complex("");
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});