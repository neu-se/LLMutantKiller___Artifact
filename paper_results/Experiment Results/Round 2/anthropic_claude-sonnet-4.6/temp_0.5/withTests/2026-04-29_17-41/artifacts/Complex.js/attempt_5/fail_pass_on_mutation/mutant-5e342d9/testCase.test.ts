import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot mutation via abs", () => {
  it("detects mutation in hypot when a >= b with large values", () => {
    // Test with values where a >= b, both large
    // The mutation changes b = x/y to b = x*y in the if(a>=b) branch
    // If placeholder is the only effective line (second line b=x/y is in else),
    // then for a=4000, b=3000:
    // Original: b = 4000/3000 = 4/3, result = 4000*sqrt(1+16/9) ≈ 6667
    // Mutated: b = 4000*3000 = 12e6, result ≈ huge
    // But if a=b reassignment happens first (a=3000):
    // Original: b=4/3, result=3000*sqrt(25/9)=5000
    // Mutated: b=12e6, result≈huge
    // Either way, mutation should give wrong answer
    // My previous tests passed on both - so maybe large path isn't triggered?
    // Let me try values just above threshold
    const c = new Complex(3500, 3200);
    const expected = Math.sqrt(3500 ** 2 + 3200 ** 2);
    expect(c.abs()).toBeCloseTo(expected, 10);
  });
});