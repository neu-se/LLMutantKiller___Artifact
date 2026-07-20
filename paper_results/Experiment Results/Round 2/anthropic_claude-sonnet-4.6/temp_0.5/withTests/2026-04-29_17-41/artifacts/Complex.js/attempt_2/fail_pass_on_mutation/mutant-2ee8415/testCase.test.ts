import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a negative real number", () => {
    // acosh(-2): acos(-2) gives re = PI, im = positive value
    // The else branch (im > 0) executes, swapping re and im
    // Mutation breaks the re assignment, leaving re as PI instead of the correct imaginary value
    const result = new Complex(-2, 0).acosh();
    
    // acosh(-2) = log(-2 + sqrt(4-1)) = log(-2 + sqrt(3))
    // = log(-2 + 1.732...) = log(-0.2679...) which has imaginary part PI
    // The correct result: re ≈ 1.3169578969248166, im ≈ PI
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});