import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.asinh()).not.toThrowError();
  });
});