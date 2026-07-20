import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth fallback uses correct sign for imaginary part', () => {
    const spy = jest.spyOn(Complex.prototype, 'atanh');
    
    try {
      new Complex(0, 1e-200).acoth();
      
      expect(spy).toHaveBeenCalledTimes(1);
      const thisArg = spy.mock.instances[0] as any;
      expect(thisArg['im']).toBe(-Infinity);
    } finally {
      spy.mockRestore();
    }
  });
});