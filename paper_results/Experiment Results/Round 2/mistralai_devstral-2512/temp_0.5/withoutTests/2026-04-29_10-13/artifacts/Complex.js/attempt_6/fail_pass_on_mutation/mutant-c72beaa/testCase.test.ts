import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return correct result for complex input with a !== 0 and b !== 0", () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).toBeCloseTo(0.5535743588970452);
    expect(result.im).toBeCloseTo(-0.402359478108525);
  });
});