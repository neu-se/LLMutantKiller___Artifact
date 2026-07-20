import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("asech of Number.MIN_VALUE differs between original (a/0) and mutated (a*0) code", () => {
    const tiny = Number.MIN_VALUE; // 5e-324
    // Verify our assumptions
    expect(tiny).not.toBe(0);
    expect(tiny * tiny).toBe(0); // underflow to 0
    
    const c = new Complex(tiny, 0);
    // isZero() = false (tiny !== 0), d = tiny*tiny + 0 = 0
    // Original: new Complex(tiny/0, 0).acosh() = new Complex(Infinity, 0).acosh()
    // Mutated:  new Complex(tiny*0, 0).acosh() = new Complex(0, 0).acosh()
    // acosh(Infinity) produces a different result than acosh(0)
    const result = c.asech();
    
    // acosh(0): acos path gives pi/2, so result should have im = pi/2 ≈ 1.5707...
    // acosh(Infinity): should give Infinity
    // Original result should NOT have im close to Math.PI/2
    expect(result.im).not.toBeCloseTo(Math.PI / 2, 5);
  });
});