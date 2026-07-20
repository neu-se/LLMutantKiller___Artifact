import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a real number", () => {
    // atanh(0.5) = 0.5493061443340548
    // In the original code: onePlus = 1 + a = 1.5, oneMinus = 1 - a = 0.5
    // In the mutated code: onePlus = 1 - a = 0.5, oneMinus = 1 - a = 0.5
    // This changes the numerator and denominator of the fraction, producing wrong result
    const result = new Complex(0.5, 0).atanh();
    const expected = 0.5493061443340548;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});