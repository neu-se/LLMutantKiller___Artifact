import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly handle the case when a=0 and b=0", () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});