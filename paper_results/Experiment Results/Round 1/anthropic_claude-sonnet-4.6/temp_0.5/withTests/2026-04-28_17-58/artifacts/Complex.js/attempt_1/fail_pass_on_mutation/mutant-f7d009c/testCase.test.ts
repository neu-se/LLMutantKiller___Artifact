import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot boundary condition at b=3000", () => {
  it("should compute abs correctly when imaginary part is exactly 3000 and real part is less than 3000", () => {
    // When b (abs of im) equals exactly 3000 and a (abs of re) < 3000,
    // original uses normalized path, mutant uses direct sqrt path
    // For very large values, these differ, but at 3000 they're equal
    // Test with a value that would overflow in direct computation but not normalized
    const c = new Complex(0, 3000);
    const result = c.abs();
    // The abs of 3000i should be exactly 3000
    expect(result).toBe(3000);
    
    // Now test with re=2999, im=3000 - original takes normalized path, mutant takes direct
    const c2 = new Complex(2999, 3000);
    const expected = Math.sqrt(2999 * 2999 + 3000 * 3000);
    expect(c2.abs()).toBeCloseTo(expected, 10);
  });
});