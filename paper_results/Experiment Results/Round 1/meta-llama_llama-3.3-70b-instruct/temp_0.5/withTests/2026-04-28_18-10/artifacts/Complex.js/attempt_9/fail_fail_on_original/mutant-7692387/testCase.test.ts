import { Complex } from './complex';

describe('Complex', () => {
  it('should not throw an error when trying to access im property after asinh on original code', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(() => complex.im).not.toThrowError();
  });
});