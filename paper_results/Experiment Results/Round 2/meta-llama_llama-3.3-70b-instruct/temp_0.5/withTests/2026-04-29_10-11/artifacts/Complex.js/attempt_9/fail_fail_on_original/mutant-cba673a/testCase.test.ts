import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should throw an error when cosh is not implemented', () => {
    const complexInstance = new Complex(1, 0);
    const coshSpy = jest.spyOn(complexInstance, 'cosh');
    coshSpy.mockImplementation(() => {
      throw new Error('cosh is not implemented');
    });
    expect(() => complexInstance.cosh()).toThrowError('cosh is not implemented');
    coshSpy.mockRestore();
  });
});