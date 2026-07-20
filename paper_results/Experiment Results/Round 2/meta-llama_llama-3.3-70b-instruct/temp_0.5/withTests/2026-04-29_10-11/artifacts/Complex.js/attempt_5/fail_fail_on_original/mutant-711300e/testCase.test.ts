import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle objects with "im" and "re" properties', () => {
    const c = new Complex({ im: 1, re: 2 });
    expect(c.re).toBe(2);
    expect(c.im).toBe(1);
  });

  it('should throw an error when creating a Complex object with an object that has only "im" property in the original code', () => {
    const originalCode = () => new Complex({ im: 1 });
    const mutatedCode = () => new Complex({ im: 1 });
    expect(originalCode).toThrow(SyntaxError);
    expect(mutatedCode).not.toThrow();
  });
});