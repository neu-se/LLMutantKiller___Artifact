import { Complex } from '../complex.js';

describe('Complex class', () => {
  it('should throw an error when only im is provided and not re', () => {
    expect(() => new Complex({ im: 1 })).toThrowError(SyntaxError);
  });
});