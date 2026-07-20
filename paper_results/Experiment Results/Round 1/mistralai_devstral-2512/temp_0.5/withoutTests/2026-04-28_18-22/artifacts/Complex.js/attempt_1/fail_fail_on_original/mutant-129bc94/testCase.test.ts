import Complex from "./complex.js";

describe("Complex.js mutation test", () => {
  it("should correctly export Complex constructor", () => {
    // This test verifies that Complex is properly exported as a constructor
    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    // The mutation changes Complex[""] to Complex, which breaks the export
    // This test will fail on the mutated version because Complex won't be properly exported
  });
});