import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch', () => {
  it('computes acsch for a complex number with non-zero imaginary part matching manual calculation', () => {
    // acsch(z) for z = 0 + 2i: b !== 0, so goes to d branch
    // d = 0 + 4 = 4, computes (0/4, -2/4).asinh() = (0, -0.5).asinh()
    // asinh(0 - 0.5i) = -i * asin(0.5) = -i * pi/6
    const result = new Complex(0, 2).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 6, 10);
  });
});