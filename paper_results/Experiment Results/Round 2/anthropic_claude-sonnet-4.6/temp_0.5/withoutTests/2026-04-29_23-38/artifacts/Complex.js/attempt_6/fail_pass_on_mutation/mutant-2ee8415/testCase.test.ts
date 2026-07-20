import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for 0-2i where else branch is taken", () => {
    // For acosh(0-2i), acos(0-2i).im > 0, so else branch is taken
    // Original: tmp=res.im(>0), res.im=-res.re, res.re=tmp
    // Mutated: tmp=res.im(>0), res.im=-res.re, res[""]=tmp (res.re stays as PI/2)
    const result = new Complex(0, -2).acosh();
    
    // Original result.re should be ~1.4436354751788103 (the old im value)
    // Mutated result.re would be PI/2 ~1.5707963...
    expect(result.re).toBeCloseTo(1.4436354751788103, 8);
  });
});