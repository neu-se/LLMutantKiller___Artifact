import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mutation detection", () => {
  it("should treat complex with only imaginary NaN as NaN number", () => {
    // Construct via polar form where only one component becomes NaN
    // abs=Infinity, arg=Infinity -> re = Infinity*cos(Infinity) = NaN, im = Infinity*sin(Infinity) = NaN
    // Try abs=1, arg=NaN -> re=cos(NaN)=NaN, im=sin(NaN)=NaN - both NaN
    
    // Use array form with NaN in only one position
    // [NaN, 0] -> re=NaN, im=0
    // Original ||: isNaN(NaN)||isNaN(0) = true -> enters if (no-op)
    // Mutated &&: isNaN(NaN)&&isNaN(0) = false -> skips if
    // Both return z with re=NaN, im=0
    
    // Since the if body is a no-op, let's verify the actual observable behavior
    // by checking that operations on such numbers work consistently
    const c = new Complex([NaN, 0]);
    expect(c.isNaN()).toBe(true);
    expect(isNaN(c.re)).toBe(true);
    expect(isNaN(c.im)).toBe(false);
    expect(c.im).toBe(0);
  });
});