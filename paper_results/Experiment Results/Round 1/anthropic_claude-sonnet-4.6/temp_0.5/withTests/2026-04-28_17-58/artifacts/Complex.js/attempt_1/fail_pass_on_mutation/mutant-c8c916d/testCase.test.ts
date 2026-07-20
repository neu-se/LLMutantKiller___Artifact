import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("should correctly compute acsc for a real number with a !== 0", () => {
    // acsc(2) = asin(1/2) = pi/6
    const result = new Complex(2, 0).acsc();
    const expected = Math.asin(0.5); // pi/6 ≈ 0.5235987755982988
    
    // The acsc method computes asin(1/z), so acsc(2) = asin(0.5) = pi/6
    // For z = (2, 0): d = 4, a/d = 0.5, -b/d = 0
    // So it calls new Complex(0.5, 0).asin()
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // Also verify acsc(0, 0) returns the special value
    const zeroResult = new Complex(0, 0).acsc();
    expect(zeroResult.re).toBeCloseTo(Math.PI / 2, 10);
    expect(zeroResult.im).toBe(Infinity);
  });
});