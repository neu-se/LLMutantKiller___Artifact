import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format number with im computed as negative zero correctly", () => {
    // sinh(0) / negative_number = -0 in JS
    // new Complex(Math.PI/4, 0).cot() gives re=1, im=-0
    // toString: EPSILON converts -0 to 0, early return "1"
    const c = new Complex(Math.PI / 4, 0).cot();
    expect(c.re).toBeCloseTo(1);
    expect(c.toString()).toBe("1");
  });
});