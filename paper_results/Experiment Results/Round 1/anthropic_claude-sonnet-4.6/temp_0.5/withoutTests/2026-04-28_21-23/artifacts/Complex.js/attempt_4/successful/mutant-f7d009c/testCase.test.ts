import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs hypot boundary", () => {
  it("uses stable formula when im is exactly 3000", () => {
    // Search for a re value where stable and simple formulas differ
    let foundRe: number | null = null;
    let stableResult: number = 0;
    
    // Try non-integer values
    for (let i = 1; i < 30000; i++) {
      const re = i * 0.1; // Non-integer values
      if (re >= 3000) break;
      const stable = 3000 * Math.sqrt(1 + (re / 3000) * (re / 3000));
      const simple = Math.sqrt(re * re + 3000 * 3000);
      if (stable !== simple) {
        foundRe = re;
        stableResult = stable;
        break;
      }
    }
    
    if (foundRe === null) {
      // Try values based on irrational numbers
      const candidates = [Math.PI, Math.E, Math.sqrt(2), Math.sqrt(3), Math.sqrt(5)];
      for (const base of candidates) {
        for (let mult = 1; mult <= 1000; mult++) {
          const re = base * mult;
          if (re >= 3000) break;
          const stable = 3000 * Math.sqrt(1 + (re / 3000) * (re / 3000));
          const simple = Math.sqrt(re * re + 3000 * 3000);
          if (stable !== simple) {
            foundRe = re;
            stableResult = stable;
            break;
          }
        }
        if (foundRe !== null) break;
      }
    }
    
    expect(foundRe).not.toBeNull();
    const c = new Complex(foundRe!, 3000);
    expect(c.abs()).toBe(stableResult);
  });
});