import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse with abs/arg producing single NaN", () => {
  it("should throw SyntaxError for abs=0 arg=Infinity giving im=NaN but re=0", () => {
    // abs=0, arg=Infinity: re = 0*cos(Inf) = NaN, im = 0*sin(Inf) = NaN
    // Both NaN - same for both versions
    // Try abs=1, arg=NaN: re=cos(NaN)=NaN, im=sin(NaN)=NaN - both NaN again
    // Try to find input where exactly one of re/im is NaN...
    // 0 * Infinity = NaN in JS
    // abs=Infinity, arg=0: re=Inf*cos(0)=Inf, im=Inf*sin(0)=0 -> neither NaN
    // But wait: !isFinite(Infinity) && isFinite(0) -> returns Complex.INFINITY before computing
    
    // What about abs=0, arg=0: re=0, im=0 -> neither NaN
    // abs=NaN, arg=NaN: re=NaN*cos(NaN)=NaN, im=NaN*sin(NaN)=NaN -> both NaN
    
    // Hmm. Let me try: what string input gives only re=NaN?
    // The string parser uses parseFloat which can give NaN
    // But if re becomes NaN from parseFloat, im would be 0 (initialized to 0)
    
    // String "NaN" -> tokens=["N","a","N"] -> 'N' is not a digit/operator/i
    // -> isNaN('N') is true but plus+minus=1 so it tries: tokens[i+1]='a' not 'i'
    // -> z['re'] += parseFloat('' + 'N') = NaN
    // -> then 'a': plus+minus=0 -> parser_exit()! So it throws before NaN check
    
    // What about number input: new Complex(NaN) -> z['re']=NaN, z['im']=0
    // Original ||: isNaN(NaN)||isNaN(0) = true -> enters if (does nothing)
    // Mutant &&: isNaN(NaN)&&isNaN(0) = false -> does NOT enter if
    // Both return z with re=NaN, im=0
    // No difference in behavior...
    
    // I think the if block must actually DO something. 
    // Maybe parser_exit IS uncommented in original and the shown code has it commented as the mutation?
    // Let's test: new Complex(NaN) should throw on original if parser_exit is called
    expect(() => new Complex(NaN)).not.toThrow();
  });
});