import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method boundary condition", () => {
  it("should return true when imaginary parts differ by exactly EPSILON", () => {
    // Complex.EPSILON is 1e-15
    // The original uses <= so difference exactly equal to EPSILON should return true
    // The mutated version uses < so it would return false
    const epsilon = Complex['EPSILON']; // 1e-15
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, epsilon);
    // real parts are equal (diff = 0 <= epsilon: true in both versions)
    // imaginary parts differ by exactly epsilon: 
    //   original: 0 + epsilon - 0 = epsilon, |epsilon| <= epsilon => true
    //   mutated:  |epsilon| < epsilon => false
    expect(c1.equals(c2)).toBe(true);
  });
});