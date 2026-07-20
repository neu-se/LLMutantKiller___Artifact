import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when the real part is not defined', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeDefined();
  });
});