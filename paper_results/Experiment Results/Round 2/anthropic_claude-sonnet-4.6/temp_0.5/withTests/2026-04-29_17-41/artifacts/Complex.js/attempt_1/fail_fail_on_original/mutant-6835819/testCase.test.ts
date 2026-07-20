import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with non-unit imaginary part", () => {
    // For z = 0.5 + 2i, the atanh computation uses b*b in the real part calculation
    // The mutation changes b*b to b/b (=1), which gives wrong results when b != ±1
    const z = new Complex(0.5, 2);
    const result = z.atanh();

    // Expected values computed from the correct formula:
    // atanh(0.5 + 2i) = log((1 + z) / (1 - z)) / 2
    // Using known mathematical result
    const expected = new Complex(0.5 + 2).atanh();

    // Compute expected using the correct formula manually:
    // a=0.5, b=2
    // oneMinus = 0.5, onePlus = 1.5
    // d = 0.5^2 + 2^2 = 0.25 + 4 = 4.25
    // re_x = (onePlus * oneMinus - b*b) / d = (0.75 - 4) / 4.25 = -3.25/4.25
    // im_x = (b * oneMinus + onePlus * b) / d = (1 + 3) / 4.25 = 4/4.25
    // With mutation: re_x = (0.75 - 1) / 4.25 = -0.25/4.25 (WRONG)

    // The correct real part of atanh(0.5 + 2i) should be approximately 0.09641562...
    expect(result.re).toBeCloseTo(0.09641562020299621, 10);
    // The correct imaginary part of atanh(0.5 + 2i) should be approximately 1.1265564...
    expect(result.im).toBeCloseTo(1.1265564856085834, 10);
  });
});