import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    const expectedRe = 0.14694666622552978;
    const expectedIm = -0.3323088547216548;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});