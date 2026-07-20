import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a real positive number (b === 0)", () => {
    // For a real number z = 2 (re=2, im=0), acsch uses the real-number shortcut
    // Original: if (b === 0) => takes shortcut: log(a + sqrt(a*a + 1))
    // Mutated: if (b !== 0) => skips shortcut for real inputs, uses general path
    const z = new Complex(2, 0);
    const result = z.acsch();
    
    // Expected value from original code's real-number path:
    // log(2 + sqrt(2*2 + 1)) = log(2 + sqrt(5))
    const expected = Math.log(2 + Math.sqrt(5));
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});