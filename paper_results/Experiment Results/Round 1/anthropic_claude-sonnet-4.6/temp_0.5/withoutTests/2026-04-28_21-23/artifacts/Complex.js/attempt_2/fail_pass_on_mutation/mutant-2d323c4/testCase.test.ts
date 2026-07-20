import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch correctly for a complex number where d = re^2 - im^2 = 0", () => {
    const z = new Complex(1, 1);
    const result = z.acsch();
    expect(result.re).toBeCloseTo(0.5306375309525178, 10);
    expect(result.im).toBeCloseTo(-0.4522784471511907, 10);
  });
});