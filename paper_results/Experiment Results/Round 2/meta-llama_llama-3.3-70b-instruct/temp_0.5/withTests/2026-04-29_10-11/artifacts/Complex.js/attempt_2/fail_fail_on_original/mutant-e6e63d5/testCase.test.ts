import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when calculating the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acsc()).toThrowError();
  });
});