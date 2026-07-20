import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when creating a Complex object with an object that has only "im" property', () => {
    expect(() => new Complex({ im: 1 })).toThrow(SyntaxError);
  });

  it('should throw an error when creating a Complex object with an object that has only "re" property', () => {
    expect(() => new Complex({ re: 1 })).toThrow(SyntaxError);
  });

  it('should not throw an error when creating a Complex object with an object that has both "im" and "re" properties', () => {
    expect(() => new Complex({ im: 1, re: 1 })).not.toThrow();
  });
});