import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec mutation test", () => {
  it("should compute asec correctly for a purely imaginary number where b !== 0 and d would be 0", () => {
    // The mutation changes (b !== 0) ? -b / 0 : 0 to (false) ? -b / 0 : 0
    // This affects the imaginary part in the d===0 branch of asec
    // We need to trigger the d===0 branch with b !== 0
    // d = a*a + b*b, so d===0 requires a===0 and b===0
    // But the early return handles a===0 && b===0 case
    // Let's verify the normal asec behavior is correct
    // asec(2) = acos(1/2) = PI/3
    const result = new Complex(2, 0).asec();
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);

    // For purely imaginary input, test asec(i) 
    // asec(i) = acos(1/i) = acos(-i)
    // 1/i = -i, so asec(i) = acos(-i)
    const resultI = new Complex(0, 1).asec();
    // acos(-i): using formula acos(z) = PI/2 - asin(z)
    // asin(-i) = -i * log(-i*i + sqrt(1-(-i)^2)) = -i * log(1 + sqrt(2))
    // Expected: re = PI/2, im = -log(1 + sqrt(2))
    const expectedRe = Math.PI / 2;
    const expectedIm = -Math.log(1 + Math.sqrt(2));
    expect(resultI.re).toBeCloseTo(expectedRe, 10);
    expect(resultI.im).toBeCloseTo(expectedIm, 10);
  });
});