import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("satisfies sinh(acsch(z)) = z for a standard complex number", () => {
    const z = new Complex(2, 1);
    const result = z.acsch();
    const check = result.sinh();
    expect(check.re).toBeCloseTo(2, 10);
    expect(check.im).toBeCloseTo(1, 10);
  });
});