import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh(0-2i) should have correct real part distinct from PI/2", () => {
    // acos(0-2i) returns (PI/2, ~1.4436) so else branch is taken in acosh
    // Original: res.re = old_im (~1.4436)
    // Mutated: this[""] = tmp, so res.re stays as PI/2 (~1.5708)
    const result = new Complex(0, -2).acosh();
    
    // Original gives re ≈ 1.4436, mutated gives re ≈ PI/2 ≈ 1.5708
    expect(result.re).toBeCloseTo(1.4436354751788103, 8);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 8);
  });
});