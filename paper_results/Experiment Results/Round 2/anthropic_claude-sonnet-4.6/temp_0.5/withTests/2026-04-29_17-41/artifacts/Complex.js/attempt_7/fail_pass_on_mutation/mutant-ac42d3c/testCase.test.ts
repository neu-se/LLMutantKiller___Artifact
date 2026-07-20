import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan(0 - i) should return a complex number with re=0 and im=-Infinity", () => {
    const result = new Complex(0, -1).atan();
    expect(result.toString()).toBe('Infinity');
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
    // Verify the sign of im is negative (not positive)
    expect(result.im).toBeLessThan(0);
  });
});