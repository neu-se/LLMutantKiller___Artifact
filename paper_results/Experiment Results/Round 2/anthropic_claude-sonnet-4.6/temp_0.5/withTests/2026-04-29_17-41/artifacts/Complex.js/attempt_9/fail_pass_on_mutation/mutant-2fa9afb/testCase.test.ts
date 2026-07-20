import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth(0+2i) should not equal (0, pi/2)', () => {
    // acoth(2i) = atanh(1/(2i)) = atanh(-i/2)
    // This is NOT (0, pi/2)
    // With mutation if(true), acoth ALWAYS returns Complex(0, PI/2)
    const result = new Complex(0, 2).acoth();
    
    // acoth(2i): d = 0 + 4 = 4, so returns (0/4, -2/4).atanh() = (0, -0.5).atanh()
    // atanh(0 - 0.5i) = -i * atan(0.5) ≈ (0, -0.4636)
    expect(result.im).toBeCloseTo(-Math.atan(0.5), 5);
  });
});