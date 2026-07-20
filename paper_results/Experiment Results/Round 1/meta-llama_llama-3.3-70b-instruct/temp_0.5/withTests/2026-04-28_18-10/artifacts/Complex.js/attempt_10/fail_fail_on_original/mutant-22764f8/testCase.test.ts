import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acot()).not.toThrowError();
  });
});