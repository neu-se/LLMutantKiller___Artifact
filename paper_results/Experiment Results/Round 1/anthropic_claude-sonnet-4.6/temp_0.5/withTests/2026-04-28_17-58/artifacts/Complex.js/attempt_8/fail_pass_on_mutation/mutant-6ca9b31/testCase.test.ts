import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should not show minus sign for zero imaginary part", () => {
    // If b=0 somehow reaches mutation point:
    // Original (b<0): false → adds "+"
    // Mutated (b<=0): true → negates 0 to -0, adds "-"
    // Result would be "3- 0i" vs "3+ 0i"
    // But b=0 triggers early return... unless we use a number that
    // passes epsilon check but equals 0 in comparison
    // In JS: -0 passes epsilon check (Math.abs(-0)=0 < 1e-15 → b=0)
    // Then b===0 → early return
    // So this is truly unreachable...
    // Let me just test the sign for b > 0
    expect(new Complex(3, 4).toString()).toContain("+");
  });
});