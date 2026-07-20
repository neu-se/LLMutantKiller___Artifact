import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should call asinh with re=0 when a=0 and d underflows to zero", () => {
    const b = Number.MIN_VALUE;
    expect(b * b).toBe(0);
    expect(b).not.toBe(0);
    
    const spy = jest.spyOn(Complex.prototype, 'asinh');
    
    new Complex(0, b).acsch();
    
    expect(spy).toHaveBeenCalled();
    const thisArg = spy.mock.instances[0];
    expect(thisArg.re).toBe(0); // Original: 0, Mutated: NaN
    
    spy.mockRestore();
  });
});