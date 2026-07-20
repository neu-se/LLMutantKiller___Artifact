import { Complex } from "./complex.js";

describe("Complex hypot function behavior", () => {
  it("should correctly calculate hypot for large values where a >= b", () => {
    // This test targets the mutation in the hypot function where b = x / y was changed to b = x * y
    // We test with large values to trigger the else branch where the mutation occurs
    const a = 4000;
    const b = 2000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    expect(c.abs()).toBeCloseTo(expectedAbs);
  });
});