import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number with non-unit magnitude", () => {
    // For z = 2 + i:
    // d = a^2 + b^2 = 4 + 1 = 5
    // Original: new Complex(a/d, -b/d) = new Complex(2/5, -1/5)
    // Mutated:  new Complex(a/d, -b*d) = new Complex(2/5, -1*5) = new Complex(0.4, -5)
    // These produce very different atanh results
    const z = new Complex(2, 1);
    const result = z.acoth();

    // The correct value of acoth(2+i):
    // acoth(z) = atanh(1/z) = atanh((2-i)/(4+1)) = atanh(0.4 - 0.2i)
    // Expected real part ≈ 0.4023594781...
    // Expected imaginary part ≈ -0.2290726829...
    
    // Verify against known correct value
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(-0.22907268296853878, 10);
  });
});