import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return Infinity string representation for atan of Complex(0, -1)", () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // Original: explicitly returns new Complex(0, -Infinity)
    // re=0, im=-Infinity -> isInfinite() checks !isNaN() && !isFinite()
    // isFinite: isFinite(0) && isFinite(-Infinity) = false -> isFinite()=false
    // isNaN: isNaN(0) || isNaN(-Infinity) = false -> isNaN()=false  
    // isInfinite: !false && !false... wait: !(isNaN() || isFinite())
    // isInfinite = !(isNaN() || isFinite()) = !(false || false) = true
    expect(result.isInfinite()).toBe(true);
    expect(result.toString()).toBe('Infinity');
    // Now check re specifically
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});