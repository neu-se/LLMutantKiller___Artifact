import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format pure imaginary number with small negative b correctly", () => {
    // b = -1e-15: Math.abs(-1e-15) = 1e-15, 1e-15 < 1e-15 is FALSE
    // So b stays as -1e-15, not zeroed
    // b === 0? No -> no early return
    // a = 0 -> else if branch
    // Original: b < 0 -> true -> adds "-"
    // Mutated: b <= 0 -> true -> adds "-"  
    // SAME RESULT - both return "-1e-15i"
    // 
    // The ONLY difference would be b = 0, caught by early return
    // This mutation appears equivalent...
    // Let me try b = 0 with a = 0 but force it past early return - impossible
    expect(new Complex(0, -1e-15).toString()).toBe("-1e-15i");
  });
});