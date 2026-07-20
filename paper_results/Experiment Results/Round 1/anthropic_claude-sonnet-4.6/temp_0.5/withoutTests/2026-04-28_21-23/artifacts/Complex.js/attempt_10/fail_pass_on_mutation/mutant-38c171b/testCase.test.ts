import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation via acsch with carefully chosen values", () => {
    // Use values where a*a + b*b underflows to 0 but b != 0
    // The key: a = Number.MIN_VALUE, b = Number.MIN_VALUE
    // d = MIN_VALUE^2 + MIN_VALUE^2 = 0 (underflow)
    // Original: new Complex(0, -Infinity).asinh() = NaN
    // Mutated: new Complex(0, 0).asinh() = {re:0, im:0}
    const a = Number.MIN_VALUE;
    const b = Number.MIN_VALUE;
    
    // Verify d underflows
    const d = a * a + b * b;
    if (d === 0) {
      // We're in the else branch
      const result = new Complex(a, b).acsch();
      expect(result.isNaN()).toBe(true);
    } else {
      // d doesn't underflow - mutation is undetectable via this path
      // Skip the test (this shouldn't happen in IEEE 754)
      expect(true).toBe(true);
    }
  });
});