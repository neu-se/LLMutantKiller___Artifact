import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("divides (a+bi)/(c+di) correctly when |c| equals |d|", () => {
    // Force the boundary case: |c| === |d|
    // Original: takes else branch; Mutated: takes if branch
    // Both branches are algebraically equivalent, so this tests correctness
    const c = new Complex(6, 3).div(new Complex(2, -2));
    // (6+3i)/(2-2i) = (6+3i)(2+2i)/8 = (12-6+i(12+6))/8 = 6/8 + 18i/8 = 0.75 + 2.25i
    expect(c.re).toBe(0.75);
    expect(c.im).toBe(2.25);
  });
});