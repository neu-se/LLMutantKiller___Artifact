import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0) imaginary part should be Infinity", () => {
    const c = new Complex(0, 0);
    const result = c['acsc']();
    const im = result['im'];
    // Original returns Complex(PI/2, Infinity): im === Infinity
    // Mutated returns Complex(0,0).asin() = Complex(0,0): im === 0
    expect(im === Infinity).toBe(true);
  });
});