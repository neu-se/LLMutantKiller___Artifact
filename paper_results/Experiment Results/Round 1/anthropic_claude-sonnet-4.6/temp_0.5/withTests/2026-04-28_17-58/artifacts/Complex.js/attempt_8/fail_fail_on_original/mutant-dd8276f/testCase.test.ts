import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("detects mutation via acsc fallback branch behavior difference", () => {
    // Verify d underflows: (5e-200)^2 = 0 in float64
    const a = 5e-200;
    const b = 0;
    const d = a * a + b * b;
    
    if (d === 0) {
      // d underflows, fallback branch taken
      // Original: im = (b !== 0) ? -b/0 : 0 = 0 → asin(0, 0) = Complex(0,0)
      // Mutated:  im = (b === 0) ? -b/0 : 0 = NaN → asin(0, NaN) = NaN
      const result = new Complex(a, b).acsc();
      expect(result.isNaN()).toBe(false);
      expect(result.re).toBeCloseTo(0, 10);
      expect(result.im).toBeCloseTo(0, 10);
    } else {
      // d doesn't underflow, takes d!==0 branch: asin(a/d, -b/d) = asin(Infinity, 0)
      // Both original and mutated behave the same here
      expect(true).toBe(true);
    }
  });
});