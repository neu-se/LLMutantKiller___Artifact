import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot with subnormal inputs causing d underflow', () => {
  it('should return Infinity real part when both a and b are subnormal causing d to underflow to zero', () => {
    const tiny = 5e-324; // Number.MIN_VALUE
    const result = new Complex(tiny, tiny).acot();
    // With original code: d=0, a!==0 so a/0=Infinity, b!==0 so -b/0=-Infinity
    // new Complex(Infinity, -Infinity).atan() -> isInfinite -> ...
    // With mutated code: d=0, a*0=0, so new Complex(0, -Infinity).atan()
    // These should produce different results
    expect(result.re).not.toBeNaN();
    // In original: Complex(Infinity, -Infinity) is infinite -> atan of infinite
    // Let's check what atan(Infinity, -Infinity) gives vs atan(0, -Infinity)
    const originalPath = new Complex(Infinity, -Infinity).atan();
    const mutatedPath = new Complex(0, -Infinity).atan();
    expect(originalPath.re).not.toEqual(mutatedPath.re);
    
    expect(result.re).toBeCloseTo(originalPath.re, 5);
  });
});