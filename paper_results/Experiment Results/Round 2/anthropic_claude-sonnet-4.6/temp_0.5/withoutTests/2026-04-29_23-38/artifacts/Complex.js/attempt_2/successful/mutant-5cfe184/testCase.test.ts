import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a purely imaginary number", () => {
    // For atanh(0 + 2i), noIM should be false (a=0, b=2, so a > 1 is false)
    // Original: noIM = false, so im is NOT negated
    // Mutated: noIM = true, so im IS negated, giving wrong sign on imaginary part
    const c = new Complex(0, 2);
    const result = c.atanh();
    
    // atanh(2i) = i * atan(2) = i * 1.1071487177940904
    const expected = Math.atan(2);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected, 10);
  });
});