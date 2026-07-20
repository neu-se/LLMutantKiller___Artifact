import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh via sin method", () => {
  it("detects if sinh uses division instead of multiplication by 0.5", () => {
    // If mutation removes Math.sinh|| AND changes *0.5 to /0.5,
    // sinh(2) would be (e^2 - e^-2) / 0.5 = ~14.507 instead of ~3.627
    // Test using .sin() on purely imaginary number: sin(0+2i) = i*sinh(2)
    const c = new Complex(0, 2);
    const result = c.sin();
    const correctSinh2 = Math.sinh(2);
    expect(result.im).toBeCloseTo(correctSinh2, 5);
    expect(result.im).not.toBeCloseTo(correctSinh2 * 4, 5);
  });
});