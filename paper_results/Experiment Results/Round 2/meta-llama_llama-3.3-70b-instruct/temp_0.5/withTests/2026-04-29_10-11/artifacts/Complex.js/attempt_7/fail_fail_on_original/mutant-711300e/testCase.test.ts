import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when creating a Complex object with an object that has only "im" property', () => {
    expect(() => new Complex({ im: 1 })).toThrow();
    expect(() => new Complex({ re: 1 })).toThrow();
    expect(() => new Complex({ re: 1, im: 1 })).not.toThrow();
  });
});