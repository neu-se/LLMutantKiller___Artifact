import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("satisfies sinh(acsch(z)) = z for z = 3+4i", () => {
    const z = new Complex(3, 4);
    const result = z.acsch().sinh();
    expect(result.re).toBeCloseTo(3, 8);
    expect(result.im).toBeCloseTo(4, 8);
  });
});