import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acot mutation detection', () => {
  it('detects mutation by checking re value passed to atan when d underflows to 0', () => {
    const tiny = 1e-200;
    
    const spy = jest.spyOn(Complex.prototype as any, 'atan');
    
    try {
      new Complex(tiny, tiny).acot();
    } finally {
      spy.mockRestore();
    }
    
    expect(spy).toHaveBeenCalled();
    const thisArg = spy.mock.instances[0] as any;
    expect(thisArg.re).toBe(Infinity);
  });
});