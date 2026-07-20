import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation detection", () => {
  it("should correctly compute acot of a complex number with non-zero imaginary part", () => {
    // acot(1 + i) where a=1, b=1, d=2
    // Original: new Complex(1/2, -1/2).atan()
    // Mutated:  new Complex(1/2, +1/2).atan()
    const z = new Complex(1, 1);
    const result = z.acot();

    // Compute expected value: acot(1+i) = atan(1/(1+i)) = atan((1-i)/2)
    // Using the original formula: new Complex(1/2, -1/2).atan()
    // atan(a + bi) where a=0.5, b=-0.5
    // d = a*a + (1-b)^2 = 0.25 + 2.25 = 2.5
    // t1 = new Complex((1 - b*b - a*a)/d, -2*a/d).log()
    //    = new Complex((1 - 0.25 - 0.25)/2.5, -1/2.5).log()
    //    = new Complex(0.5/2.5, -0.4).log()
    //    = new Complex(0.2, -0.4).log()
    // result = new Complex(-0.5 * t1.im, 0.5 * t1.re)
    
    // The mutated version would use (1/2, +1/2) instead, giving a different result
    // We verify the imaginary part sign is correct (original has -b/d = -0.5, mutated has +0.5)
    
    const expected = new Complex(1/2, -1/2).atan();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});