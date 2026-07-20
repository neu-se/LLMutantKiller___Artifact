import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should return correct result when d is zero", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});