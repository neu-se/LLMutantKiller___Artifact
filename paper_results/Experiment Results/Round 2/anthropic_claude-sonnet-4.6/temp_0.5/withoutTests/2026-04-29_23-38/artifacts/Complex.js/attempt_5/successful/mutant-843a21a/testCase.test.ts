import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("detects mutation in asech d=0 fallback using negative subnormal", () => {
    // With a = -Number.MIN_VALUE, b = 0:
    // d = a*a + 0 = 0 (underflow), a !== 0
    // Original: new Complex((-MIN_VALUE)/0, 0) = new Complex(-Infinity, 0).acosh()
    // Mutated:  new Complex((-MIN_VALUE)*0, 0) = new Complex(-0, 0).acosh() = new Complex(0, 0).acosh()
    // acosh(-Infinity) should differ from acosh(0)
    const negInfAcosh = new Complex(-Infinity, 0).acosh();
    const zeroAcosh = new Complex(0, 0).acosh();
    
    // Verify they differ so our test is meaningful
    const resultNeg = new Complex(-Number.MIN_VALUE, 0).asech();
    
    // Original gives acosh(-Infinity, 0), mutated gives acosh(0, 0)
    // Check that result matches original (acosh(-Infinity))
    expect(resultNeg.re).toEqual(negInfAcosh.re);
    expect(resultNeg.im).toEqual(negInfAcosh.im);
  });
});