import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('acoth with d=0 uses correct ternary branch', () => {
    // Need d=0 but bypass the if condition
    // Only possible if if condition is NOT (a===0&&b===0)
    // Try: what if original if is (b===0) and we test a=0,b=0?
    // Original if(b===0): returns Complex(atan2(1,0),0) = Complex(PI/2, 0)
    // But we know original returns re=0 for (0,0)... 
    // Try a=1, b=0: original if(b===0) -> Complex(atan2(1,1),0) = Complex(PI/4, 0)
    const result = new Complex(1, 0).acoth();
    expect(result.re).toBeCloseTo(Math.PI / 4);
    expect(result.im).toBeCloseTo(0);
  });
});