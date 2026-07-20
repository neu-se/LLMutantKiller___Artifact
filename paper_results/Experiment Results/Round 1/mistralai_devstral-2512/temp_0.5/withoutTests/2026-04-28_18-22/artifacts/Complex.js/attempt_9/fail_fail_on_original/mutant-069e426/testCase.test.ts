import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return correct value when a=0 and b=0", () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});