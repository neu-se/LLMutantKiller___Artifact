import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh(0-2i) real part should not equal PI/2", () => {
    // acos(0-2i) returns (PI/2, ~1.4436) so else branch is taken in acosh
    // Original: res.re = old_im (~1.4436), NOT PI/2
    // Mutated: this[""] = tmp, so res.re stays PI/2
    const result = new Complex(0, -2).acosh();
    
    // Verify it's NOT PI/2 (which is what mutation would give)
    const piOver2 = Math.PI / 2;
    expect(Math.abs(result.re - piOver2)).toBeGreaterThan(0.1);
    // And verify the correct value
    expect(result.re).toBeCloseTo(1.4436354751788103, 8);
    expect(result.im).toBeCloseTo(Math.PI / 2, 8);
  });
});