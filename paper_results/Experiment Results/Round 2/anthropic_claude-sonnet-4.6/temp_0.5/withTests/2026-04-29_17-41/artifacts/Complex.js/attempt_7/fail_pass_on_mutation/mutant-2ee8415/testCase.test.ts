import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh of -2i should correctly swap re and im parts", () => {
    // For -2i, acos(-2i) should give im > 0, triggering the else branch
    // Original else branch: tmp=im, im=-re, re=tmp (re gets old im value)
    // Mutated else branch: tmp=im, im=-re, re stays unchanged (re keeps old re value)
    const result = new Complex(0, -2).acosh();
    const acosResult = new Complex(0, -2).acos();
    
    // If else branch ran: acosResult.im > 0
    // Original: result.re = acosResult.im, result.im = -acosResult.re
    // Mutated: result.re = acosResult.re (unchanged), result.im = -acosResult.re
    // So result.re differs between original and mutated
    expect(result.re).toBeCloseTo(acosResult.im, 10);
  });
});