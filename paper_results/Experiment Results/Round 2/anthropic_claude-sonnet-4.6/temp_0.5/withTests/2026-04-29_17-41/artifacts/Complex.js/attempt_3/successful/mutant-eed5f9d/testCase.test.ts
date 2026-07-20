import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsch', () => {
  it('uses correct real part in d===0 branch when a is nonzero', () => {
    const spy = jest.spyOn(Complex.prototype, 'asinh');
    
    const tiny = 1e-200; // tiny enough that d = a*a + b*b = 0 (underflow)
    new Complex(tiny, tiny).acsch();
    
    // In original: asinh is called with this.re = Infinity (since a/0 = Infinity)
    // In mutated: asinh is called with this.re = 0 (since (false) ? a/0 : 0 = 0)
    const instance = spy.mock.instances[0];
    expect(instance.re).toBe(Infinity);
    
    spy.mockRestore();
  });
});