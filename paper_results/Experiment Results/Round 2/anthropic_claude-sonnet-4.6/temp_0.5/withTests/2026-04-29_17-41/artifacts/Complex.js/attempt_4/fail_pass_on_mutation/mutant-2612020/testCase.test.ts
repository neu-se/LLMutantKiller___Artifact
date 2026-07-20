import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a real-only string and have re property equal to the parsed value", () => {
    const c = new Complex("42");
    expect(c.re).toBe(42);
    expect(c.im).toBe(0);
  });
});