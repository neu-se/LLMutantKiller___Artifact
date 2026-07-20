import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should return NaN when zero is multiplied by Infinity", () => {
    // In the mul method, the NaN check reads:
    // if ((this['isInfinite']() && z['isZero']()) || (this['isZero']() && z[""]())) {
    // The z[""]() call - z[""] is undefined, calling it throws TypeError
    // BUT this only executes when this['isZero']() is true (short-circuit)
    //
    // In the ORIGINAL code this line is:
    // if ((this['isInfinite']() && z['isZero']()) || (this['isZero']() && z['isInfinite']())) {
    //
    // So zero.mul(Infinity) in original returns NaN
    // In mutated code, zero.mul(anything) throws TypeError because z[""]() is called
    //
    // The <PLACEHOLDER> mutation is the if-condition for the real*real optimization.
    // But the file ALSO shows z[""]() in the NaN check - that must be the actual
    // mutation we need to test against.
    //
    // Let's test: new Complex(0,0).mul(new Complex(Infinity, Infinity))
    // Original: this.isZero()=true, z.isInfinite()=true -> NaN
    // Mutated: this.isZero()=true, z[""]() throws TypeError

    const zero = new Complex(0, 0);
    const inf = Complex['INFINITY'];
    
    // In original: returns NaN complex
    // In mutated: throws TypeError
    expect(() => {
      const result = zero.mul(inf);
      expect(result.isNaN()).toBe(true);
    }).not.toThrow();
  });
});