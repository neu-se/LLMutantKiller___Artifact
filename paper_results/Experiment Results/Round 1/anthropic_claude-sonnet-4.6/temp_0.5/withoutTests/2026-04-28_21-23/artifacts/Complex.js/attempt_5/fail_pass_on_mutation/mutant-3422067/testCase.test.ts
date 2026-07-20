import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('abs with large equal components matches direct calculation', () => {
    const x = 4000;
    const y = 4000;
    // hypot(4000, 4000): a=b=4000, large-number path
    // Original else: b=4000/4000=1, return 4000*sqrt(2)
    // Mutant if: a=4000, b=4000/4000=1, return 4000*sqrt(2)
    // These are the same...
    
    // Let me try with the 3000 boundary
    // hypot(3000, 3000): a=3000, b=3000
    // First condition: 3000 < 3000 is FALSE, so large-number path
    // a === b, mutation triggers, but result same
    
    // What about hypot(2999, 3000)?
    // First condition: 2999 < 3000 TRUE, 3000 <= 3000 TRUE → fast path
    // sqrt(2999^2 + 3000^2)
    
    // What about hypot(3000, 2999)?
    // First condition: 3000 < 3000 FALSE → large-number path
    // a=3000 > b=2999, else branch: b=2999/3000
    // return 3000 * sqrt(1 + (2999/3000)^2)
    
    // These two should give the same result (hypot is symmetric)
    // but they take different code paths!
    expect(new Complex(2999, 3000).abs()).toBeCloseTo(new Complex(3000, 2999).abs(), 10);
  });
});