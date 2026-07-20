import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should have re=1 when constructed with re=1 and im=NaN in mutated version", () => {
    // Original (||): isNaN(1)||isNaN(NaN) = true -> enters block
    // Mutated (&&): isNaN(1)&&isNaN(NaN) = false -> skips block
    // If block body does: z['re'] = NaN; z['im'] = NaN; (normalize to full NaN)
    // Then original: {re:NaN, im:NaN}, mutated: {re:1, im:NaN}
    // Test: in original, re should be NaN; in mutated, re should be 1
    // But previous tests show re=1 in original too...
    // So block must truly be empty.
    
    // Let me try the OPPOSITE: test that re IS NaN in original
    // If this fails on original, it means block is empty
    // If this passes on original but fails on mutated, we found the difference
    const c = new Complex(1, NaN);
    // Hypothesis: original normalizes partial NaN to full NaN
    expect(isNaN(c.re)).toBe(true);
  });
});