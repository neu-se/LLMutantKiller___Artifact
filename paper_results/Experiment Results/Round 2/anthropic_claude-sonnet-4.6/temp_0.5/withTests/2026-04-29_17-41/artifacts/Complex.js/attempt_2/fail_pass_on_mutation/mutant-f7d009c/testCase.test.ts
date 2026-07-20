import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot boundary condition at b=3000", () => {
  it("abs() result for complex number with |im|=3000 matches the safe hypot path", () => {
    // When a=2999, b=3000: original uses ratio path (a<3000 but b is NOT <3000)
    // ratio path: a<b so a=3000, b=2999/3000; result = 3000*sqrt(1+(2999/3000)^2)
    // mutated uses: sqrt(2999^2 + 3000^2)
    // These can differ in floating point precision
    const c = new Complex(2999, 3000);
    const result = c.abs();
    
    // Compute what the original ratio path gives
    const a = 3000;
    const b = 2999 / 3000;
    const expected = a * Math.sqrt(1 + b * b);
    
    expect(result).toBe(expected);
  });
});