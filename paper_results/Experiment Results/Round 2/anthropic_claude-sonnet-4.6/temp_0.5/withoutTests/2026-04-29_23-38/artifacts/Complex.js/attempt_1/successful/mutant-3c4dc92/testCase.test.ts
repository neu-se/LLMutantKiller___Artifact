import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-trivial real and imaginary parts", () => {
    // For z = 0.5 + 2i:
    // oneMinus = 1 - 0.5 = 0.5
    // Original: d = 0.5 * 0.5 + 2 * 2 = 0.25 + 4 = 4.25
    // Mutated:  d = 0.5 / 0.5 + 2 * 2 = 1 + 4 = 5
    // These produce different results for atanh
    const z = new Complex(0.5, 2);
    const result = z.atanh();

    // The correct value of atanh(0.5 + 2i) can be verified mathematically
    // atanh(z) = log((1+z)/(1-z)) / 2
    // (1+z) = 1.5 + 2i, (1-z) = 0.5 - 2i
    // (1.5+2i)/(0.5-2i) = (1.5+2i)(0.5+2i)/((0.5)^2+(2)^2)
    //                   = (0.75 + 3i + i + 4i^2) / 4.25
    //                   = (0.75 - 4 + 4i) / 4.25
    //                   = (-3.25 + 4i) / 4.25
    // log(-3.25/4.25 + (4/4.25)i) / 2
    const expectedRe = Math.log(Math.sqrt((-3.25/4.25)**2 + (4/4.25)**2)) / 2;
    const expectedIm = Math.atan2(4/4.25, -3.25/4.25) / 2;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});