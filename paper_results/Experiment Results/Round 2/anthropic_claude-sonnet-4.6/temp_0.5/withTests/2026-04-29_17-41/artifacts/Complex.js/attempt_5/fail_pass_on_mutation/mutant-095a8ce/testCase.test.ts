import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc zero input", () => {
  it("acsc of zero should return a complex number with infinite imaginary part", () => {
    const c = new Complex(0, 0);
    const result = c['acsc']();
    const imIsInfinite = result['im'] === Infinity;
    expect(imIsInfinite).toBe(true);
  });
});