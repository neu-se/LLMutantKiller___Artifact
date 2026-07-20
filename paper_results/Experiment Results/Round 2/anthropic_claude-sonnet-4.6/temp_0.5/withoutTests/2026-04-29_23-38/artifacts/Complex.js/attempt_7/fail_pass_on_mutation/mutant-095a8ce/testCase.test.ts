import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth zero input special case", () => {
  it("acoth(0+0i) should return Complex(0, PI/2)", () => {
    const z = new Complex(0, 0);
    const result = z.acoth();
    // Original: special case returns Complex(0, PI/2)
    // Mutated: if(false) skips it, falls through to d=0 path -> atanh(0,0) -> Complex(0,0)
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});