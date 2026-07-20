import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("acsch else branch passes Infinity (not 0) as imaginary part to asinh", () => {
    const v = Number.MIN_VALUE;
    
    let capturedIm: number | undefined;
    const spy = jest.spyOn(Complex.prototype as any, 'asinh').mockImplementation(function(this: any) {
      capturedIm = this.im;
      // Call the original implementation
      jest.restoreAllMocks();
      const result = (this as any).asinh();
      spy.mockImplementation(function(this: any) {
        capturedIm = this.im;
        return (Complex.prototype as any).asinh.call(this);
      });
      return result;
    });
    
    new Complex(v, -v).acsch();
    
    jest.restoreAllMocks();
    
    // Original: capturedIm = Infinity
    // Mutated: capturedIm = 0
    expect(capturedIm).toBe(Infinity);
  });
});