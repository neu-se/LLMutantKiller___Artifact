import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate log correctly for zero', () => {
    const complex = new Complex(0);
    expect(() => complex.log()).toThrowError(SyntaxError);
  });
});