import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not throw an error when accessing the "re" property of a complex number created with no arguments', () => {
    const complex = new Complex();
    expect(() => complex.re).not.toThrowError();
  });
});