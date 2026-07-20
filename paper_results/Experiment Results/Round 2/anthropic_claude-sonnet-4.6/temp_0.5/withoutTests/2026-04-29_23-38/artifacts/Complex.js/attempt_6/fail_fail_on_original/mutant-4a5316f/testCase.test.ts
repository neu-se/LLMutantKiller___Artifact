import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of complex number should match inverse of tanh", () => {
    // If acoth is correct, tanh(acoth(z)) should equal z
    // Test with z = 2 + 3i
    const z = new Complex(2, 3);
    const acothZ = z.acoth();
    const result = acothZ.tanh();
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(3, 10);
  });
});