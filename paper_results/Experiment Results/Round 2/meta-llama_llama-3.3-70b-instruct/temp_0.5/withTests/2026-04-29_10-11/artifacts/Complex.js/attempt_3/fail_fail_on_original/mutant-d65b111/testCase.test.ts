import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when calculating asech for complex numbers with mutation', () => {
    const complex = new Complex(0.5, 0);
    expect(() => complex.asech()).toThrowError();
  });
});