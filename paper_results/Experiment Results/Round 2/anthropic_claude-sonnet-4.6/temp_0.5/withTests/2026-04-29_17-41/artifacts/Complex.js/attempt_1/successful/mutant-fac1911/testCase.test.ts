import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("should correctly compute acsch for a complex number with non-unit real part", () => {
    // For z = 2 + i:
    // Original: d = a*a + b*b = 4 + 1 = 5, so 1/z = (2/5) + (-1/5)i = 0.4 - 0.2i
    // Mutated:  d = a/a + b*b = 1 + 1 = 2, so 1/z = (2/2) + (-1/2)i = 1 - 0.5i
    // These produce different asinh results
    const z = new Complex(2, 1);
    const result = z.acsch();

    // Compute expected: acsch(2+i) = asinh(1/(2+i)) = asinh((2-i)/5)
    // 1/(2+i) = (2-i)/(4+1) = 0.4 - 0.2i
    // asinh(0.4 - 0.2i) can be computed via the known formula
    // We verify against the correct mathematical result
    const expected = new Complex(0.4, -0.2).asinh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});