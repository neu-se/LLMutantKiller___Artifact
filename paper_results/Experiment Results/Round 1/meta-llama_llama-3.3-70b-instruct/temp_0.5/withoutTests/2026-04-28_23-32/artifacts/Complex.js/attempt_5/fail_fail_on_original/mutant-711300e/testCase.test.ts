import { Complex } from './complex.js';

describe('Complex class', () => {
  it('should correctly parse complex numbers from objects', () => {
    expect(() => new Complex({ im: 1 })).toThrowError(SyntaxError);
  });
});