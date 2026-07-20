import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("satisfies sinh(acsch(z)) = z for z with equal magnitude parts", () => {
    const z = new Complex(1, 1);
    const result = z.acsch();
    const check = result.sinh();
    expect(check.re).toBeCloseTo(1, 10);
    expect(check.im).toBeCloseTo(1, 10);
  });
});