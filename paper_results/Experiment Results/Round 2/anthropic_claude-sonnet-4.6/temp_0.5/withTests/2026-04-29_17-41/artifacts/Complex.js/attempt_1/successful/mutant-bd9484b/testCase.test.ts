import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return the correct acosh for input 0 (where acos gives im === 0)", () => {
    const result = new Complex(0, 0).acosh();
    // acosh(0) should be i*pi/2 (positive imaginary part)
    // Original code: res['im'] <= 0 catches im === 0, giving positive imaginary result
    // Mutated code: res['im'] < 0 misses im === 0, giving negative imaginary result
    expect(result['re']).toBeCloseTo(0, 10);
    expect(result['im']).toBeCloseTo(Math.PI / 2, 10);
  });
});