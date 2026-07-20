import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not throw an error when creating a complex number with an object that only has one of "re" or "im" properties', () => {
    expect(() => new Complex({ re: 1 })).not.toThrow();
    expect(() => new Complex({ im: 2 })).not.toThrow();
  });
});