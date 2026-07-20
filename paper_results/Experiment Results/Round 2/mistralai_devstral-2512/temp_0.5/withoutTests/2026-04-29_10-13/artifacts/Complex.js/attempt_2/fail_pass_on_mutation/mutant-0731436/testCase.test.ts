import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly handle the case when both real and imaginary parts are zero", () => {
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});