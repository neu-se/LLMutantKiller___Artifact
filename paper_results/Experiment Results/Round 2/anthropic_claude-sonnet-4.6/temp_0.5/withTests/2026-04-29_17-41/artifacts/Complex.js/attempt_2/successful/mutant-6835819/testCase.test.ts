import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number where b*b != b/b", () => {
    // For z = 0 + 2i (a=0, b=2):
    // oneMinus = 1, onePlus = 1, d = 0 + 4 = 4
    // Original re_x = (1*1 - 2*2) / 4 = (1 - 4) / 4 = -3/4
    // Mutated  re_x = (1*1 - 2/2) / 4 = (1 - 1) / 4 = 0
    // These produce clearly different atanh results
    const z = new Complex(0, 2);
    const result = z.atanh();

    // atanh(2i) = i * atan(2) mathematically
    // atan(2) ≈ 1.1071487177940904
    // So atanh(2i) should have re=0 and im=atan(2)
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.atan(2), 5);
  });
});