// Test case to detect the mutation in complex.js
import Complex from "./complex.js";

describe("Complex.js module export", () => {
  it("should properly export the Complex class in CommonJS environment", () => {
    // This test verifies that the Complex class is properly exported
    // The mutation removes the actual export logic, causing this to fail
    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    expect(typeof Complex).toBe('function');
  });
});