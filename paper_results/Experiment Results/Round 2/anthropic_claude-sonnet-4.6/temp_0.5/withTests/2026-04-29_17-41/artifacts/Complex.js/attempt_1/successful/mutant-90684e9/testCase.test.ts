import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex clone method", () => {
  it("should return a new Complex instance with the same real and imaginary parts", () => {
    const c = new Complex(3, 4);
    const cloned = c.clone();
    
    expect(cloned).toBeDefined();
    expect(cloned).not.toBeNull();
    expect(cloned).toBeInstanceOf(Complex);
    expect(cloned.re).toBe(3);
    expect(cloned.im).toBe(4);
  });
});