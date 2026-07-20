import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not throw an error when accessing the "re" property of a complex number', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.re).not.toThrowError();
  });
});