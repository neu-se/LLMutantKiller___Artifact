import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('acosh of a real number greater than 1 should give correct real result', () => {
    // acosh(2) - real input > 1
    // acos(2) gives re=0, im < 0, so if-branch executes (not the mutated else branch)
    // acosh(2) should equal log(2 + sqrt(3))
    const result = new Complex(2, 0).acosh();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // Now test with complex input that triggers else branch
    // acosh(i) - acos(i) should have im > 0
    const result2 = new Complex(0, 1).acosh();
    // In original: tmp=res.re (declared in if, so undefined in else via hoisting)
    // Actually var is function-scoped, so tmp IS declared but undefined when else runs
    // res['im'] = -res['re'] (original) vs NaN (mutated)
    // res['re'] = tmp = undefined -> NaN in both cases
    // So re=NaN in both, but im differs!
    expect(isNaN(result2.im)).toBe(false);
  });
});