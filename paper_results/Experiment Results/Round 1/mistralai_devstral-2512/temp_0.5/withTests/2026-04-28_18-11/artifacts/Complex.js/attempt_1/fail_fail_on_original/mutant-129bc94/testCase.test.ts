// Test to detect the mutation in Complex.js
import Complex from "./complex";

describe("Complex.js mutation test", () => {
  it("should correctly expose the Complex constructor via the expected property", () => {
    // The original code sets Complex['Complex'] = Complex
    // The mutated code sets Complex[""] = Complex instead
    // This test checks for the expected property name
    expect(Complex['Complex']).toBeDefined();
    expect(Complex['Complex']).toBe(Complex);
  });
});