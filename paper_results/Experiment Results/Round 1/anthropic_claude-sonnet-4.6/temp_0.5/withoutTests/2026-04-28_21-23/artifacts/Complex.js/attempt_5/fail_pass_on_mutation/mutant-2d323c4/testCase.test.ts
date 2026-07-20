import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch with correct re and im for z where d = re^2 - im^2 = 0", () => {
    // z = 3 + 4i: d = 9 - 16 = -7 (nonzero, both branches same)
    // Need to find expected values independently
    // acsch(z) = asinh(1/z)
    // 1/(3+4i) = (3-4i)/25 = 0.12 - 0.16i
    // asinh(0.12 - 0.16i) should give specific values
    const z = new Complex(3, 4);
    const invZ = new Complex(1, 0).div(z);
    const expected = invZ.asinh();
    const result = z.acsch();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});