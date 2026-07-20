import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    // csc(z) for a real number, e.g., csc(pi/6) = 2
    const z = new Complex(Math.PI / 6, 0);
    const result = z.csc();
    
    // csc(pi/6) = 1/sin(pi/6) = 1/0.5 = 2
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});