import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub", () => {
  it("should return INFINITY when this is finite and z is infinite", () => {
    const finite = new Complex(1, 2);
    const inf = new Complex(Infinity, 0); // infinite (re is Infinity)
    
    // Original second check (||): finite.isInfinite()=false OR inf.isInfinite()=true → true → INFINITY
    // Mutated second check (&&): finite.isInfinite()=false AND inf.isInfinite()=true → false → arithmetic
    // Arithmetic: (1-Infinity, 2-0) = (-Infinity, 2) which isInfinite = true
    // Both give infinite result... 
    
    // What if arithmetic gives NaN? Need re subtraction = NaN
    // (1, 2).sub(Infinity, Infinity): z=(Infinity,Infinity)=Complex.INFINITY, both checks...
    // z is infinite, this is finite: first && check: false && true = false → passes
    // second check: original || → INFINITY; mutated && → false → arithmetic
    // arithmetic: (1-Infinity, 2-Infinity) = (-Infinity, -Infinity) = infinite
    
    // I need this=finite, z=infinite where arithmetic gives NaN
    // Only way: this.re - z.re = NaN, meaning this.re = Infinity too? But then this is infinite.
    
    // What if this=(NaN, 0)? isNaN=true, isInfinite=false. Not infinite.
    // (NaN,0).sub(Infinity,0): neither check fires, arithmetic: (NaN-Infinity, 0) = (NaN,0) = NaN
    // Original and mutated both give NaN here.
    
    // The mutation must be detectable - let me try: this=infinite, z=finite
    // where z.re = this.re value making arithmetic give NaN... impossible if z is finite.
    
    // Only detectable case: this=infinite XOR z=infinite, and we check the EXACT return value type
    // Original: INFINITY (the singleton)
    // Mutated: new Complex(-Infinity, something) which isInfinite but !== Complex.INFINITY
    
    const result = finite.sub(inf);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});