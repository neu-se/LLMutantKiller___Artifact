import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot d=0 branch", () => {
  it("should call atan with negative imaginary infinity when b is positive subnormal", () => {
    const tiny = Number.MIN_VALUE;
    
    const atanSpy = jest.spyOn(Complex.prototype, 'atan');
    
    new Complex(0, tiny).acot();
    
    expect(atanSpy).toHaveBeenCalled();
    const thisArg = atanSpy.mock.instances[0] as Complex;
    // Original: im = -b/0 = -Infinity (b > 0)
    // Mutated:  im = +b/0 = +Infinity
    expect(thisArg.im).toBe(-Infinity);
    
    atanSpy.mockRestore();
  });
});