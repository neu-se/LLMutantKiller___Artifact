import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number less than -1", () => {
    // acosh(-2) - the acos branch will have negative imaginary part
    // triggering the mutated code path
    const result = new Complex(-2, 0).acosh();
    
    // acosh(-2) = log(-2 + sqrt(4-1)) = log(-2 + sqrt(3)) 
    // = π*i + log(2 + sqrt(3)) approximately
    // re should be approximately 1.3169578969248166
    // im should be approximately π
    const expectedRe = Math.log(2 + Math.sqrt(3));
    const expectedIm = Math.PI;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});