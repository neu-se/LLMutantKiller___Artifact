import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc for a purely imaginary number (a=0, b!=0)", () => {
    // For z = i (re=0, im=1), acsc(i) should NOT return PI/2 + Infinity*i
    // In the original code: condition is (a === 0 && b === 0), which is false for z=i
    // In the mutated code: condition is (a === 0 && true), which is true for z=i,
    // incorrectly returning new Complex(Math.PI / 2, Infinity)
    const z = new Complex(0, 1);
    const result = z.acsc();

    // acsc(i) = -i * log(i/i + sqrt(1 - 1/i^2))
    // = -i * log(1 + sqrt(1 - (-1)))
    // = -i * log(1 + sqrt(2))
    // The result should be a finite complex number, not Infinity
    expect(isFinite(result.im)).toBe(true);
    expect(result.im).not.toBe(Infinity);
  });
});