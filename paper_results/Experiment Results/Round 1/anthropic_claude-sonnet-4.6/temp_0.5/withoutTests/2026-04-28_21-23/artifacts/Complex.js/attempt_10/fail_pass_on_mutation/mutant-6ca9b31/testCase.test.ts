import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString mutation detection", () => {
  it("detects b<0 vs b<=0 mutation using valueOf returning 0 only at comparison", () => {
    let callCount = 0;
    const calls: number[] = [];
    const fakeIm: any = {
      valueOf() {
        callCount++;
        calls.push(callCount);
        // Return 1 for first N calls, then 0
        // We need Math.abs(b) call to get 1, and comparison to get 0
        return callCount <= 5 ? 1 : 0;
      }
    };

    const c = Object.create(Complex.prototype) as any;
    c['re'] = 1;
    c['im'] = fakeIm;

    const result = c.toString();
    // If result is "1", early return fired, need more 1s
    // If result contains "+", original behavior
    // If result contains "-", mutated behavior
    expect(result).toContain("+");
  });
});