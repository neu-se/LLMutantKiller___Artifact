import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a specific complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.402359478108525, 10);
    expect(result.im).toBeCloseTo(-0.5535743588970451, 10);
  });
});