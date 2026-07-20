import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with infinity", () => {
  it("should return INFINITY (not NaN) when adding a finite complex to an infinite one where components would cancel", () => {
    // this = finite complex with re = -Infinity... no that's infinite
    // Need: this is finite, z is infinite
    // Mutated fallthrough: new Complex(this.re + Infinity, this.im + Infinity)
    // For finite this, finite + Infinity = Infinity, so still works...
    // 
    // Need this to be infinite but z to be finite, where z.re = -Infinity
    // But z = new Complex(-Infinity, 0): isFinite = false, isNaN = false => isInfinite = true
    // So both infinite => returns NaN in both original and mutated
    //
    // What if z is finite but has a value that when added to Infinity gives NaN?
    // finite + Infinity = Infinity always... 
    //
    // The only way to get NaN from addition with Infinity is Infinity + (-Infinity)
    // So we need this.re = Infinity and z.re = -Infinity, but then both are infinite
    // and the first check catches it returning NaN in both cases.
    //
    // What about: this is infinite, z is finite
    // Original: returns Complex.INFINITY
    // Mutated: returns new Complex(Infinity + z.re, Infinity + z.im) = new Complex(Infinity, Infinity)
    // Same result...
    //
    // The difference must be in the RETURNED OBJECT TYPE
    // Complex.INFINITY has re=Infinity, im=Infinity
    // new Complex(Infinity, Infinity) also has re=Infinity, im=Infinity
    // So behavior is identical for normal cases.
    //
    // BUT: what if this = new Complex(Infinity, -Infinity)?
    // isFinite = false, isNaN = false => isInfinite = true
    // z = new Complex(1, 2) => isInfinite = false
    // Original: returns Complex.INFINITY (re=Infinity, im=Infinity)
    // Mutated: returns new Complex(Infinity+1, -Infinity+2) = new Complex(Infinity, -Infinity)
    // These differ! Original im=Infinity, Mutated im=-Infinity
    
    const a = new Complex(Infinity, -Infinity);
    const b = new Complex(1, 2);
    const result = a.add(b);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});