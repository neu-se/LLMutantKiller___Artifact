import { Complex } from "./complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes -b/d to -b*d, which will significantly alter the result
    // For the input (0.5, 0.5), the correct result should have specific properties
    // that will differ when the mutation is present
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(-0.570635581125244, 10);
  });
});