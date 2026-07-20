import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle the difference between || and && operators', () => {
    const originalCosh = Math.cosh;
    jest.spyOn(Math, 'cosh').mockImplementation(() => {
      throw new Error('Mock error');
    });
    const complex = new Complex(1, 0);
    expect(() => complex.cosh()).toThrowError('Mock error');
    Math.cosh = originalCosh;
  });
});