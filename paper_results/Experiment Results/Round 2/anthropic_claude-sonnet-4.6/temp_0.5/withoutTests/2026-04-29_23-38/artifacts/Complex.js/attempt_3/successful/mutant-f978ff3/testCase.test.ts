import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should compute csch(z) equal to 1/sinh(z)", () => {
    // csch(z) = 1/sinh(z), so csch(z) * sinh(z) should equal 1
    // We can verify this by computing sinh(z) and then checking that
    // csch(z).mul(sinh(z)) equals Complex(1, 0)
    
    const z = new Complex(1, 1);
    const sinhZ = z.sinh();
    const cschZ = z.csch();
    
    // csch(z) * sinh(z) should equal 1
    const product = cschZ.mul(sinhZ);
    
    expect(product.re).toBeCloseTo(1, 5);
    expect(product.im).toBeCloseTo(0, 5);
  });
});