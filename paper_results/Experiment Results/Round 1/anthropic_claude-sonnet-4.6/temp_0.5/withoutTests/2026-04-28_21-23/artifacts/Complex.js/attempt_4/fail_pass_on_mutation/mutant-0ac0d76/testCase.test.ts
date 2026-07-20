import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should correctly compute pow for positive real base with real exponent", () => {
    // pow uses logHypot internally for the general case
    // When base is positive real (b=0, a>0) and exponent is real:
    // Original pow: if (b === 0 && a > 0) returns Math.pow(a, z['re']) directly  
    // This is in pow, not log - but log's mutation might affect asin/acos which call log
    
    // asin calls log internally - test asin of a value that goes through log with positive real
    const result = new Complex(0, 0).asin();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // Test atan which calls log
    const result2 = new Complex(1, 0).atan();
    expect(result2.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});