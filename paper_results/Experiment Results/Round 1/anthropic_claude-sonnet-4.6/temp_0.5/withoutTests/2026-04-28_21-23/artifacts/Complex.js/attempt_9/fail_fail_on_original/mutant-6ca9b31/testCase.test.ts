import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString mutation detection", () => {
  it("detects b<0 vs b<=0 mutation using valueOf object", () => {
    let callCount = 0;
    const fakeIm: any = {
      valueOf() {
        callCount++;
        // Need to return > EPSILON for call #3 (Math.abs(b))
        // and 0 for subsequent calls (comparisons)
        return callCount <= 3 ? 1 : 0;
      }
    };

    const c = Object.create(Complex.prototype) as any;
    c['re'] = 1;
    c['im'] = fakeIm;

    const result = c.toString();
    // Original: b < 0 -> valueOf call -> 0 < 0 -> false -> "+"
    // Mutated:  b <= 0 -> valueOf call -> 0 <= 0 -> true -> "-"
    expect(result).toContain("+");
  });
});