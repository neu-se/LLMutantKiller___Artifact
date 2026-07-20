import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const expected = Math.cos(x) - 1.0;
    const complex = new Complex(x, 0);
    const result = complex.expm1().re;
    expect(result).toBeCloseTo(expected, 10);
  });
});