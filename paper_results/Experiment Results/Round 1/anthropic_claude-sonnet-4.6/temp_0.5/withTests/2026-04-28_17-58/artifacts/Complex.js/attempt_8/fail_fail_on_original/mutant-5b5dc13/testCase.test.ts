import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("detects mutation: acsch d=0 fallback passes re=0 (not NaN) to asinh in original", () => {
    const tiny = 5e-324;
    
    const spy = jest.spyOn(Complex.prototype as any, 'asinh');
    spy.mockImplementation(function(this: any) {
      return spy.getMockImplementation()!.call(this);
    });
    
    // Actually let's just use the spy to capture the this value
    let capturedThis: any;
    const originalAsinh = (Complex.prototype as any).asinh;
    (Complex.prototype as any).asinh = function(this: any) {
      capturedThis = this;
      return originalAsinh.call(this);
    };
    
    new Complex(0, tiny).acsch();
    
    (Complex.prototype as any).asinh = originalAsinh;
    
    // Original: (0 !== 0) ? 0/0 : 0 = 0, so capturedThis.re = 0
    // Mutated:  (0 === 0) ? 0/0 : 0 = NaN, so capturedThis.re = NaN
    expect(capturedThis).toBeDefined();
    expect(Number.isNaN(capturedThis.re)).toBe(false);
    expect(capturedThis.re).toBe(0);
  });
});