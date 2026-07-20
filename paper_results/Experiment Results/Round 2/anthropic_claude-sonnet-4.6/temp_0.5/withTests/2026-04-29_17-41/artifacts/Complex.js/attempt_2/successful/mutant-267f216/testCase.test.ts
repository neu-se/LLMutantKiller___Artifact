import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a purely imaginary number", () => {
    // For z = 0 + 2i (a=0, b=2):
    // Original: d = 0*0 + 2*2 = 4, computes (0/4 - 2/4 * i).asinh() = (0 - 0.5i).asinh()
    // Mutated:  d = 0*0 - 2*2 = -4, computes (0/(-4) - 2/(-4) * i).asinh() = (0 + 0.5i).asinh()
    // These give different imaginary parts
    const z = new Complex(0, 2);
    const result = z.acsch();

    // acsch(2i) = asinh(-0.5i) = -i * asin(0.5) = -i * pi/6
    // So result.re should be 0 and result.im should be -pi/6
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 6, 10);
  });
});