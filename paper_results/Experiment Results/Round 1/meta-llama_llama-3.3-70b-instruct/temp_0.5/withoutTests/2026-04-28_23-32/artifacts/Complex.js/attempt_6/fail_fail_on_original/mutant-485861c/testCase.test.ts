import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when trying to access a non-existent property', () => {
    const complex = new Complex();
    expect(complex.im).toBeDefined();
    expect(() => complex['']).toThrowError();
  });
});