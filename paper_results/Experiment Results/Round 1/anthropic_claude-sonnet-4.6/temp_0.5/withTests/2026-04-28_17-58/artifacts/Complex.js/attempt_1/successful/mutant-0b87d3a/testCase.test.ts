import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a non-zero complex number with non-zero d", () => {
    // For acsc(z), when z = 1 (real), d = a*a + b*b = 1 != 0
    // Original: return (d !== 0) ? new Complex(a/d, -b/d).asin() : ...
    // Mutant:   return (d === 0) ? new Complex(a/d, -b/d).asin() : ...
    // When d != 0, original takes the first branch (correct), mutant takes second branch (wrong)
    
    const z = new Complex(1, 0);
    const result = z.acsc();
    
    // acsc(1) = asin(1/1) = asin(1) = pi/2
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});