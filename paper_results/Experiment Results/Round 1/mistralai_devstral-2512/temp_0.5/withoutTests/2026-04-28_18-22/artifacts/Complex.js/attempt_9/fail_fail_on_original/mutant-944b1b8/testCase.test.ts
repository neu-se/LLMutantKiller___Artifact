import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct result for asec(0, 0)", () => {
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});