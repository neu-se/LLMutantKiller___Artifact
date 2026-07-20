import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("acsch should correctly use imaginary part for complex input", () => {
    // acsch(1 + i): with correct b = 1
    // With mutated b = this[""] = 0: treats input as purely real, giving wrong result
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // acsch(z) = asin(i/z) rotated, computed via: inverse then asin with rotation
    // For (1+i): d = 1+1 = 2, inverse = (1-i)/2 = (0.5, -0.5)
    // With b=0 (mutated): d = 1, inverse = (1, 0), giving acsch(1,0) result
    const wrongResult = new Complex(1, 0).acsch();
    
    // The correct result should differ from treating it as purely real
    expect(result.re).not.toBeCloseTo(wrongResult.re, 5);
  });
});