import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a csch function that returns a value', () => {
    const complex = new Complex(1, 1);
    expect(complex.csch).toBeInstanceOf(Function);
    expect(() => complex.csch()).not.toThrow();
  });
});